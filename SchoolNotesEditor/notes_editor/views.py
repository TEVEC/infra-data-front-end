from django.shortcuts import render, redirect, get_object_or_404
from .models import Student

def home(request):
    if request.method == 'POST':
        student_id = request.POST.get('id')  # Get student ID from hidden input
        student_name = request.POST.get('name')
        student_note = request.POST.get('note')

        if student_id:  # Check if student ID exists for update
            student = get_object_or_404(Student, id=student_id)
            student.name = student_name
            student.note = student_note
            student.save()
        else:
            new_student = Student(name=student_name, note=student_note)
            new_student.save()
        return redirect('home')

    students = Student.objects.all()
    return render(request, 'students/home.html', {'students': students})