import React, { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Form } from '@unform/web'
import { Input, Button } from '../../shared/components'
import { Icon } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { v4 as uuid } from 'uuid'

import { getTracks } from '../../api/spot-list-api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const SearchMusic = ({ handleModal, open, handleMusics }) => {
  const formRef = useRef(null)

  const [rows, setRows] = useState([])

  const [musicOptions, setMusicOptions] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  const handleChange = (event) => {
    setMusicOptions(event.target.value)
  }

  const columns = [
    {
      field: 'albumName',
      headerName: 'Nome do Album',
      width: 400,
      align: 'left',
    },
    {
      field: 'totalOfMusics',
      headerName: 'Total de Musicas',
      width: 130,
      align: 'right',
    },
  ]

  const handleSelectedMusics = useCallback(() => {
    const selected = rows.filter((row) => selectedRows.includes(row.id))

    handleMusics(selected)
    handleModal()
  }, [handleMusics, rows, selectedRows, handleModal])

  const handleGetMusics = useCallback(
    async ({ search }) => {
      const { data } = await getTracks({
        query: musicOptions,
        value: search,
      })

      const formatedData = data.map((item) => {
        return {
          ...item,
          id: uuid(),
        }
      })

      setRows(formatedData)
    },
    [musicOptions],
  )
  return (
    <div>
      <Modal open={open} onClose={handleModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pesquise suas músicas favoritas
          </Typography>

          <Box marginTop={2} marginBottom={2}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Opções</FormLabel>
              <RadioGroup
                row
                value={musicOptions}
                onChange={handleChange}
                defaultValue=""
                name="radio-buttons"
              >
                <FormControlLabel
                  value="artist"
                  control={<Radio />}
                  label="Artista"
                />
                <FormControlLabel
                  value="album"
                  control={<Radio />}
                  label="Album"
                />
                <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="Nome de Musica"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Form ref={formRef} onSubmit={handleGetMusics}>
            <Box display="flex" alignItems="center">
              <Input name="search" placeholder="Pesquisar" />
              <Button
                type="submit"
                style={{
                  width: '60px',
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '16px',
                }}
              >
                <Icon>search</Icon>
              </Button>
            </Box>
          </Form>

          <Box marginTop={3}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 7 },
                },
              }}
              onRowSelectionModelChange={(ids) => {
                setSelectedRows(ids)
              }}
              rowSelectionModel={selectedRows}
              pageSizeOptions={[7, 14]}
              checkboxSelection
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Button onClick={handleSelectedMusics}>Selecionar</Button>

            <div style={{ marginLeft: '8px', marginRight: '8px' }}></div>

            <Button
              style={{
                backgroundColor: '#ff0000',
                color: '#fff',
              }}
              onClick={handleModal}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
