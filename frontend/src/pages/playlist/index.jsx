import { useCallback, useState, useEffect } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Icon, IconButton, Menu, MenuItem } from '@mui/material'

import './styles.css'

import { BaseLayout } from '../../shared/layouts/BaseLayout/BaseLayout'

import { FormToolbar } from '../../shared/components'

import { getPlaylists } from '../../api/spot-list-api'

import { Image } from './styles'
import { useNavigate } from 'react-router-dom'
import { PlaylistDetails } from './PlaylistDetails'

export const Playlist = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const [rows, setRows] = useState([])

  const [selectedRow, setSelectedRow] = useState(null)

  const [playlist, setPlaylist] = useState({})

  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => setOpenModal(false)

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleGoBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const handleOpenModal = useCallback((data) => {
    setOpenModal(true)
    setPlaylist(data)
  }, [])

  const getMusicsByUserInDatabase = useCallback(async () => {
    const { data } = await getPlaylists()

    console.log(data)

    setRows(data)
  }, [])

  const handleEdit = (row) => {
    console.log(row)
    // navigate(`/playlist/details/${row.id}`)
  }

  useEffect(() => {
    getMusicsByUserInDatabase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BaseLayout
      toolbar={
        <FormToolbar
          showNew
          showSalve={false}
          handleNew={() => navigate('/playlist/details/new')}
          handleBack={handleGoBack}
        />
      }
    >
      {openModal && (
        <PlaylistDetails
          open={openModal}
          handleClose={handleCloseModal}
          playlist={playlist}
        />
      )}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width="30px">
                Ações
              </TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="left">Título</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left" width="30px">
                  <Box>
                    <IconButton
                      key={row.id}
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => {
                        handleOpenMenu(event)
                        setSelectedRow(row)
                      }}
                    >
                      <Icon>more_horiz</Icon>
                    </IconButton>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate(`/playlist/details/${selectedRow.id}`)
                        }}
                      >
                        <IconButton>
                          <Icon>edit</Icon>
                        </IconButton>
                        Editar
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          navigate(`/playlist/details/${selectedRow.id}`)
                        }
                      >
                        <IconButton>
                          <Icon>visibility</Icon>
                        </IconButton>
                        Visualizar
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenu}>
                        <IconButton>
                          <Icon>delete</Icon>
                        </IconButton>
                        Excluir
                      </MenuItem>
                    </Menu>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  {row.image ? (
                    <Image src={row.image} alt={row.title} />
                  ) : (
                    <Image
                      src="https://img.freepik.com/vetores-gratis/guitarra-com-desenho-de-simbolo-de-melodia-de-musica_1308-99174.jpg?w=900&t=st=1700565964~exp=1700566564~hmac=5d1d6a023e95d51a475841baf8e5e0fe5b7165aaad4f58930f01223cd7d5bc8a"
                      alt="Nome"
                    />
                  )}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  )
}
