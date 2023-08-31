'use client'

import { Container, Typography, Card, Stack, Box } from '@mui/material'
import AuthPage from '@/wrapper/Auth'
import { useState } from 'react'
import { studentNoteType } from '@/types/studentNote'
import AddStudentForm from '@/components/AddStudentForm'
import StudentNoteRow from '@/components/StudentNoteRow'

const Home: React.FC = () => {
  const [studentsNote, setStudentsNote] = useState<studentNoteType[]>([])

  const handleEditStudent = (
    id: string,
    field: string,
    value: string | number
  ) => {
    const updatedSudentsNote = studentsNote.map(studentNote => {
      if (studentNote.id === id)
        field === 'name'
          ? (studentNote.name = value as string)
          : (studentNote.note = value as number)
      return studentNote
    })

    setStudentsNote(updatedSudentsNote)
  }

  const handleDeleteStudent = (id: string) => {
    const updatedSudentsNote = studentsNote.filter(
      studentNote => studentNote.id !== id
    )
    setStudentsNote(updatedSudentsNote)
  }

  const handleAddStudent = (name: string, note: number) => {
    const newStudentsNote = [
      ...studentsNote,
      {
        id: window.crypto.randomUUID(),
        name,
        note
      }
    ]
    setStudentsNote(newStudentsNote)
  }

  return (
    <AuthPage>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          my: '32px'
        }}
      >
        <Box sx={{ maxWidth: '600px', width: '95%' }}>
          <Stack>
            <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
              Edição de Notas Escolares
            </Typography>
          </Stack>
          <Typography
            sx={{ mt: '16px', mb: 1, fontSize: '18px', fontWeight: 'bold' }}
          >
            Adicionar novo aluno
          </Typography>
          <Card sx={{ p: 3, py: 2 }}>
            <AddStudentForm handleAddStudent={handleAddStudent} />
          </Card>
          <Typography
            sx={{ mt: '16px', mb: 1, fontSize: '18px', fontWeight: 'bold' }}
          >
            Lista de Alunos
          </Typography>
          <Card sx={{ my: 2, px: 3, pt: 2 }}>
            {studentsNote.map(studentNote => (
              <StudentNoteRow
                key={studentNote.id}
                studentNote={studentNote}
                handleEditStudent={handleEditStudent}
                handleDeleteStudent={handleDeleteStudent}
              />
            ))}
          </Card>
          {/* {
          <Box>
            <Typography>
              Infelizmente não encontramos o estudante &quot; &quot;.
            </Typography>
          </Box>
        } */}
        </Box>
      </Container>
    </AuthPage>
  )
}

export default Home
