'use client'

import { Container, Typography, Card, Stack, Box, Button } from '@mui/material'
import AuthPage from '@/wrapper/Auth'
import { useEffect, useRef, useState } from 'react'
import { studentNoteType } from '@/types/studentNote'
import AddStudentForm from '@/components/AddStudentForm'
import StudentNoteRow from '@/components/StudentNoteRow'
import { api } from '@/service/api'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CsvDownloader from 'react-csv-downloader'
import { cleanData } from '@/utils/cleanData'

const Home: React.FC = () => {
  const [studentsNote, setStudentsNote] = useState<studentNoteType[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    saveStudentsNote(updatedSudentsNote)
  }

  const handleDeleteStudent = (id: string) => {
    const updatedSudentsNote = studentsNote.filter(
      studentNote => studentNote.id != id
    )
    setStudentsNote(updatedSudentsNote)
    saveStudentsNote(updatedSudentsNote)
  }

  const handleAddStudent = (name: string, note: number) => {
    const id = Math.floor(Math.random() * 99999999999).toString()
    const newStudentsNote = [
      ...studentsNote,
      {
        id,
        name,
        note
      }
    ]
    setStudentsNote(newStudentsNote)
    saveStudentsNote(newStudentsNote)
  }

  const onChangeInputFile = (event: any) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('csv', file)
    api
      .post('/json-data/csv', formData)
      .then(result => {
        const { data } = result
        if (data && data.data && data.data?.length > 0) {
          const cleanedData = cleanData(data.data)
          setStudentsNote(cleanedData as studentNoteType[])
          saveStudentsNote(cleanedData as studentNoteType[])
        }
      })
      .finally(() => {
        const fileInput = document.getElementById('file') as HTMLInputElement
        fileInput.value = ''
      })
  }

  const saveStudentsNote = async (studentsNote: studentNoteType[]) => {
    api.post('/json-data', { data: JSON.stringify(studentsNote) })
  }

  const getSavedStudentsNote = async () => {
    api.get('/json-data').then(result => {
      const { data } = result
      setStudentsNote(JSON.parse(data.data))
    })
  }

  useEffect(() => {
    getSavedStudentsNote()
  }, [])

  return (
    <AuthPage>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          my: '32px',
          px: '8px'
        }}
      >
        <Box sx={{ maxWidth: '600px', width: '95%' }}>
          <Stack>
            <Typography
              sx={{ fontSize: { xs: '18px', sm: '24px' }, fontWeight: 'bold' }}
            >
              Edição de Notas Escolares
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            my={2}
          >
            <Typography
              sx={{
                mt: '16px',
                mb: 1,
                fontSize: { xs: '14px', sm: '18px' },
                fontWeight: 'bold'
              }}
            >
              Adicionar novo aluno
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{ height: '40px' }}
                endIcon={<FileDownloadIcon />}
              >
                <CsvDownloader
                  datas={studentsNote as any}
                  filename="notas.csv"
                  separator={','}
                >
                  Exportar
                </CsvDownloader>
              </Button>
              <Button
                variant="contained"
                sx={{ height: '40px' }}
                endIcon={<FileUploadIcon />}
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <input
                  ref={fileInputRef}
                  placeholder="importar"
                  type="file"
                  id="file"
                  accept=".csv"
                  hidden
                  onChange={onChangeInputFile}
                />
                Importar
              </Button>
            </Stack>
          </Stack>
          <Card sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
            <AddStudentForm handleAddStudent={handleAddStudent} />
          </Card>
          <Typography
            sx={{
              mt: '16px',
              mb: 1,
              fontSize: { xs: '14px', sm: '18px' },
              fontWeight: 'bold'
            }}
          >
            Lista de Alunos
          </Typography>
          <Card sx={{ my: 2, px: { xs: 1, sm: 3 }, pt: 2 }}>
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
