from django.db import models

class Notes(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.text