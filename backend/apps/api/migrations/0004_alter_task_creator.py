# Generated by Django 5.1.4 on 2024-12-06 13:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_customuser_id_alter_project_id_alter_task_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_tasks', to=settings.AUTH_USER_MODEL),
        ),
    ]
