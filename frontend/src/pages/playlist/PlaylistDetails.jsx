import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react'

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

import { savePlaylist, getPlaylistById } from '../../api/spot-list-api'

import { SearchText } from './styles'

import { SearchMusic } from './SearchMusic'

export const PlaylistDetails = () => {
  const formRef = useRef(null)
  const [openSearch, setOpenSearch] = useState(false)
  const [musics, setMusics] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [playlist, setPlaylist] = useState({})

  const navigate = useNavigate()

  const { id } = useParams()

  const columns = [
    {
      field: 'albumName',
      headerName: 'Nome do Album',
      width: 600,
      align: 'left',
    },
    {
      field: 'totalOfMusics',
      headerName: 'Total de Musicas',
      width: 130,
      align: 'right',
    },
  ]

  const text = useMemo(() => {
    return id !== 'new'
      ? 'Detalhes da playlist'
      : 'Criação de uma nova playlist'
  }, [id])

  const handleSubmit = useCallback(
    async (formData) => {
      const { title, description } = formData

      const playlist = {
        title,
        description,
        tracks: musics,
      }

      if (id !== 'new') Object.assign(playlist, { id })

      const result = await savePlaylist(playlist)

      console.log(result)
    },
    [musics, id],
  )

  const handleModal = useCallback(() => {
    setOpenSearch(!openSearch)
  }, [openSearch])

  const handleSearchMusic = useCallback((selectedMusics) => {
    setMusics((prevState) => [...prevState, ...selectedMusics])
  }, [])

  const handleDeleteMusic = useCallback(() => {
    const selected = musics.filter((music) => !selectedRows.includes(music.id))

    setMusics(selected)
  }, [setMusics, musics, selectedRows])

  const getPlaylist = useCallback(async () => {
    const { data } = await getPlaylistById(id)

    console.log(data)

    const { tracks } = data

    setMusics(tracks)

    setPlaylist(data)
  }, [id])

  useEffect(() => {
    if (id !== 'new') {
      getPlaylist()
    }
  }, [getPlaylist, id])

  return (
    <BaseLayout
      toolbar={
        <FormToolbar
          handleSave={() => formRef.current?.submitForm()}
          handleBack={() => navigate('/playlist')}
          showNew
          handleNew={() => navigate('/playlist/details/new')}
          showDelete
          handleDelete={handleDeleteMusic}
        />
      }
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {text}
        </Typography>

        <Form ref={formRef} onSubmit={handleSubmit} initialData={playlist}>
          <Input name="title" placeholder="Nome da Playlist" />
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
          <Accordion expanded={id !== 'new'}>
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
                    rows={musics}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 7 },
                      },
                    }}
                    pageSizeOptions={[7, 14]}
                    checkboxSelection
                    onRowSelectionModelChange={(ids) => {
                      setSelectedRows(ids)
                    }}
                    rowSelectionModel={selectedRows}
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
