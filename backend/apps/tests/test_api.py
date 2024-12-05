from rest_framework.test import APITestCase
from .models import Project

class ProjectAPITest(APITestCase):
    def test_create_project(self):
        response = self.client.post('/api/projects/', {'name': 'Test Project'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Project.objects.count(), 1)
