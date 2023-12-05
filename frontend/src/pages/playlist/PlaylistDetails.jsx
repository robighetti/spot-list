import React, { useRef, useState, useCallback, useMemo } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { BaseLayout } from '../../shared/layouts/BaseLayout/BaseLayout'
import { FormToolbar, Input } from '../../shared/components'
import { DataGrid } from '@mui/x-data-grid'

import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import { Form } from '@unform/web'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Icon, IconButton } from '@mui/material'

import { SearchText } from './styles'

import { SearchMusic } from './SearchMusic'

export const PlaylistDetails = () => {
  const formRef = useRef(null)
  const [openSearch, setOpenSearch] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]

  const text = useMemo(() => {
    return id !== 'new'
      ? 'Detalhes da playlist'
      : 'Criação de uma nova playlist'
  }, [id])

  const handleSubmit = useCallback(async (formData) => {
    console.log(formData)
  }, [])

  const handleModal = useCallback(() => {
    setOpenSearch(!openSearch)
  }, [openSearch])

  const handleSearchMusic = useCallback((musics) => {
    console.log(musics)
  }, [])

  return (
    <BaseLayout
      toolbar={
        <FormToolbar
          handleSave={handleSubmit}
          handleBack={() => navigate('/playlist')}
          showNew
          handleNew={() => navigate('/playlist/details/new')}
          showDelete
          handleDelete={() => console.log('delete')}
        />
      }
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {text}
        </Typography>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome da Playlist" />
          <Input name="description" placeholder="Descrição da Playlist" />
        </Form>

        {openSearch && (
          <SearchMusic
            handleModal={handleModal}
            open={openSearch}
            handleMusics={handleSearchMusic}
          />
        )}

        <Box marginTop={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sua Playlist</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box flex={1}>
                <SearchText>
                  Pesquise aqui suas musicas {'-->'}
                  <IconButton
                    style={{
                      width: '50px',
                      marginLeft: '8px',
                    }}
                    onClick={handleModal}
                  >
                    <Icon>search</Icon>
                  </IconButton>
                </SearchText>

                <Box marginTop={3}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 7 },
                      },
                    }}
                    pageSizeOptions={[7, 14]}
                    checkboxSelection
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </BaseLayout>
  )
}
