import React from 'react'
import { studentNoteType } from '@/types/studentNote'
import {
  Container,
  Typography,
  Card,
  Stack,
  Box,
  TextField,
  Button
} from '@mui/material'
interface props {
  studentNote: studentNoteType
  handleEditStudent: (id: string, field: string, value: string | number) => void
  handleDeleteStudent: (id: string) => void
}
const StudentNoteRow: React.FC<props> = ({
  studentNote,
  handleEditStudent,
  handleDeleteStudent
}) => {
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEditStudent(studentNote.id, 'name', event.target.value)
  }

  const onChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEditStudent(studentNote.id, 'note', event.target.value)
  }

  const onDeleteButtonClick = () => {
    handleDeleteStudent(studentNote.id)
  }

  return (
    <Stack direction="row" gap="8px" mb={2}>
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="Nome"
        placeholder="Nome"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={studentNote.name}
        onChange={onChangeName}
      />
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="Nota"
        placeholder="Nota"
        type="number"
        size="small"
        value={studentNote.note}
        onChange={onChangeNote}
        InputProps={{ inputProps: { min: '0', max: '10', step: '1' } }}
      />
      <Button
        size="small"
        fullWidth
        variant="contained"
        color="error"
        onClick={onDeleteButtonClick}
        sx={{ maxWidth: '120px' }}
      >
        Eliminar
      </Button>
    </Stack>
  )
}

export default StudentNoteRow
