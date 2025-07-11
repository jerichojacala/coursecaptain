# Generated by Django 5.1.3 on 2025-06-11 22:08

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('url', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('municipality', models.TextField()),
                ('subdivision', models.TextField(blank=True)),
                ('country', models.TextField()),
                ('url', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.TextField()),
                ('number', models.IntegerField()),
                ('credits', models.IntegerField()),
                ('subschool', models.TextField(blank=True)),
                ('professor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.professor')),
                ('school', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='project.school')),
            ],
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.course')),
                ('schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.schedule')),
            ],
        ),
        migrations.AddField(
            model_name='professor',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.school'),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('email', models.TextField()),
                ('image_file', models.ImageField(blank=True, upload_to='')),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.school')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='schedule',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.student'),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('difficulty', models.IntegerField()),
                ('satisfaction', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('grade', models.CharField(max_length=3)),
                ('semester', models.TextField()),
                ('year', models.IntegerField()),
                ('notes', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('title', models.TextField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.student')),
            ],
        ),
        migrations.CreateModel(
            name='Subschool',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('url', models.URLField(blank=True)),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.school')),
            ],
        ),
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=20, validators=[django.core.validators.RegexValidator(message='Phone number must be in E.164 format (+1234567890)', regex='^\\+[1-9]\\d{1,14}$')])),
                ('type', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)])),
                ('verification_status', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(2)])),
                ('verification_code', models.CharField(blank=True, max_length=6, null=True)),
                ('verification_sent_at', models.DateTimeField(blank=True, null=True)),
                ('is_primary', models.BooleanField(db_index=True, default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.student')),
            ],
            options={
                'ordering': ['-is_primary', '-created_at'],
                'unique_together': {('student', 'number')},
            },
        ),
    ]
