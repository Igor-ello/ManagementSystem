from django.test import TestCase
from backend.apps.api.models import Project, Task

class ProjectModelTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Test Project", description="A test project")

    def test_project_creation(self):
        """Тест создания проекта"""
        self.assertEqual(self.project.name, "Test Project")
        self.assertEqual(self.project.description, "A test project")

class TaskModelTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Test Project", description="A test project")
        self.task = Task.objects.create(
            title="Test Task",
            description="A test task",
            status="To Do",
            project=self.project
        )

    def test_task_creation(self):
        """Тест создания задачи"""
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.status, "To Do")
        self.assertEqual(self.task.project.name, "Test Project")

# class UserProfileModelTest(TestCase):
#     def setUp(self):
#         self.user_profile = UserProfile.objects.create(user_id=1, role="Developer")
#
#     def test_user_profile_creation(self):
#         """Тест создания профиля пользователя"""
#         self.assertEqual(self.user_profile.user_id, 1)
#         self.assertEqual(self.user_profile.role, "Developer")
