from django.db import models

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    note = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name
