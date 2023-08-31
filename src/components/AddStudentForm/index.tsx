import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  TextField,
  Stack,
  Box,
  Button,
  Divider,
  IconButton
} from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
const validationSchema = yup.object({
  name: yup.string().required('nome é obrigatório'),
  note: yup
    .number()
    .min(0, 'Nota minima ultrapassada')
    .max(10, 'Nota máxima ultrapassada')
    .required('Nota é obrigatório')
})

interface props {
  handleAddStudent: (name: string, note: number) => void
}

const AddStudentForm: React.FC<props> = ({ handleAddStudent }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      note: 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { name, note } = values
      handleAddStudent(name, note)
      resetForm()
    }
  })

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" gap="8px" sx={{ height: '50px' }}>
          <TextField
            required
            size="small"
            fullWidth
            label="Nome"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            required
            size="small"
            fullWidth
            label="Nota"
            id="note"
            name="note"
            type="number"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
            InputProps={{ inputProps: { min: '0', max: '10', step: '1' } }}
          />
          <Button
            size="small"
            fullWidth
            variant="contained"
            color="success"
            sx={{
              maxWidth: '120px',
              maxHeight: '40px',
              display: { xs: 'none ', sm: 'block' }
            }}
            type="submit"
          >
            Adicionar
          </Button>
          <IconButton
            type="submit"
            color="success"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <AddCircleRoundedIcon />
          </IconButton>
        </Stack>
      </form>
    </Box>
  )
}

export default AddStudentForm
