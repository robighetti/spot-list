import { useCallback, useState } from 'react'

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

import { Image } from './styles'
import { useNavigate } from 'react-router-dom'
import { PlaylistDetails } from './PlaylistDetails'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

export const Playlist = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const [playlist, setPlaylist] = useState({})

  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => setOpenModal(false)

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ]

  const handleGoBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const handleOpenModal = useCallback((data) => {
    setOpenModal(true)
    setPlaylist(data)
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
              <TableCell align="center">#ID</TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="left">Título</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" width="30px">
                  <Box>
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleOpenMenu}
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
                        onClick={() =>
                          handleOpenModal({ playlist: 'playlist' })
                        }
                      >
                        <IconButton>
                          <Icon>edit</Icon>
                        </IconButton>
                        Editar
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenu}>
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
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">
                  <Image
                    src="https://img.freepik.com/vetores-gratis/guitarra-com-desenho-de-simbolo-de-melodia-de-musica_1308-99174.jpg?w=900&t=st=1700565964~exp=1700566564~hmac=5d1d6a023e95d51a475841baf8e5e0fe5b7165aaad4f58930f01223cd7d5bc8a"
                    alt="Nome"
                  />
                </TableCell>
                <TableCell align="left">
                  IAUHSiUAHSiuAHSIuhiuAH HUAIShIAS
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  )
}
