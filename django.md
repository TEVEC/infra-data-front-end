
## Passo a Passo para Executar o Projeto

1. **Clonar o Repositório:**
   Clone o repositório do GitHub para a sua máquina local:
   ```bash
   git clone <URL_DO_REPOSITORIO>

2. **Configurar ambiente Virtual:**
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

3. **Instalar dependencias:**
pip install -r requirements.txt

4. **Instalar Banco de dados:**
cd SchoolNotesEditor/
python manage.py migrate

5. **Criar usuário root:**
python manage.py createsuperuser

6. **Executar o servidor:**
python manage.py runserver

7. **Executar a aplicação:**
http://127.0.0.1:8000/admin/


