from django.db import models

class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)
    f_name = models.CharField(max_length=255)
    l_name = models.CharField(max_length=255)
    address = models.TextField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255)


class Admintration(models.Model):
    user = models.OneToOneField(Student,primary_key=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)



class StudentDocuments(models.Model):
    user = models.ForeignKey(Student,primary_key=True, on_delete=models.CASCADE )
     

class SCC(models.Model):
    pass 
    
class HouseCommittee(models.Model):
    pass 
    
class Leadership(models.Model):
    pass 
    
class HouseParent(models.Model):
    pass 
    
class Officer(models.Model):
    pass 
    
class Payment(models.Model):
    pass 
    
class company(models.Model):
    pass 
    
class OnResidennce(models.Model):
    pass 
    
class OffResidence(models.Model):
    pass 
    
class BursaryPayment(models.Model):
    pass 
    

class CastPayment(models.Model):
    pass 
class Security(models.Model):
    pass 


class Cleaner(models.Model):
    pass 

