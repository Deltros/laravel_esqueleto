# Notas de Despliegue y Consideraciones Importantes

## 1. Requisitos previos
- Docker y Docker Compose instalados.
- Acceso a los puertos 8080 (nginx), 9000 (php-fpm) y 3306 (MySQL).

## 2. Despliegue Automatizado

### Desarrollo Local y Producción

**El proyecto está completamente automatizado. Solo necesitas:**

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd <carpeta-del-proyecto>
   ```

2. Copia el archivo `.env.example` a `.env` dentro de `backend/`:
   ```bash
   cp backend/.env.example backend/.env
   ```
   > El archivo ya está configurado para MySQL con Docker.

3. Levanta los contenedores:
   ```bash
   docker compose up --build -d
   ```

**¡Eso es todo!** 🎉

### ¿Qué se instala automáticamente?

✅ **Laravel Sanctum** - Autenticación API basada en tokens
✅ **Spatie Laravel Permission** - Sistema de roles y permisos
✅ **Todas las dependencias de Laravel**
✅ **Configuración de base de datos MySQL**

### ¿Qué se ejecuta automáticamente al iniciar?

✅ **Migraciones** (incluyendo `personal_access_tokens` y tablas de permisos)
✅ **Publicación de configuraciones** (Sanctum y Permission)
✅ **Limpieza de cachés** (config, route, cache)
✅ **Regeneración de autoload**
✅ **Configuración de permisos** de carpetas storage

### Configuración de Base de Datos

El archivo `.env.example` ya está configurado para MySQL:
```
DB_CONNECTION=mysql
DB_HOST=laravel-db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

El archivo `config/database.php` está forzado a usar MySQL:
```php
'default' => 'mysql',
```

## 3. Autenticación API (Laravel Sanctum)

El proyecto incluye Laravel Sanctum para autenticación basada en tokens.

### Endpoints disponibles:

- **Registro:** `POST /api/register`
  ```json
  {
    "name": "Usuario",
    "email": "usuario@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```

- **Login:** `POST /api/login`
  ```json
  {
    "email": "usuario@example.com",
    "password": "password123"
  }
  ```

- **Logout:** `POST /api/logout` (requiere token)
- **Usuario:** `GET /api/user` (requiere token)

### Para usar endpoints protegidos:
Incluye el token en el header de la petición:
```
Authorization: Bearer {token}
```

### Configuración:
- El modelo `User` ya incluye el trait `HasApiTokens`
- Las rutas están configuradas en `routes/api.php`
- El controlador `AuthController` maneja toda la lógica de autenticación

## 4. Sistema de Roles y Permisos (Spatie Laravel Permission)

El proyecto incluye Spatie Laravel Permission para manejo de roles y permisos.

### Configuración automática:
- ✅ Instalación automática en Docker
- ✅ Migraciones automáticas (tablas `roles`, `permissions`, `model_has_roles`, etc.)
- ✅ Configuración publicada automáticamente

### Uso básico:
```php
// Asignar rol a usuario
$user->assignRole('admin');

// Verificar rol
if ($user->hasRole('admin')) {
    // ...
}

// Verificar permiso
if ($user->hasPermissionTo('edit posts')) {
    // ...
}
```

## 5. Estructura del Proyecto

```
seguros/
├── backend/                 # Aplicación Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   └── AuthController.php  # Controlador de autenticación
│   │   └── Models/
│   │       └── User.php            # Modelo con HasApiTokens
│   ├── routes/
│   │   └── api.php                 # Rutas API
│   ├── config/
│   │   ├── database.php            # Configuración MySQL forzada
│   │   └── sanctum.php             # Configuración Sanctum
│   ├── Dockerfile                  # Configuración Docker automatizada
│   ├── docker-entrypoint.sh        # Script de inicialización
│   └── .env.example                # Variables de entorno
├── docker-compose.yml              # Configuración de contenedores
└── nginx.conf                      # Configuración Nginx
```

## 6. Consideraciones para Producción

### Variables de entorno importantes:
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://tu-dominio.com`
- Credenciales seguras para base de datos

### Optimizaciones recomendadas:
```bash
# Cache de configuración
docker exec laravel-app php artisan config:cache

# Cache de rutas
docker exec laravel-app php artisan route:cache

# Cache de vistas
docker exec laravel-app php artisan view:cache
```

### Seguridad:
- Cambia las credenciales por defecto de MySQL
- Configura HTTPS en producción
- Revisa los permisos de archivos
- Configura backups de base de datos

## 7. Comandos Útiles

### Desarrollo:
```bash
# Ver logs de Laravel
docker exec laravel-app php artisan log:clear

# Ejecutar migraciones
docker exec laravel-app php artisan migrate

# Crear migración
docker exec laravel-app php artisan make:migration create_table_name

# Crear controlador
docker exec laravel-app php artisan make:controller ControllerName

# Limpiar cachés
docker exec laravel-app php artisan config:clear
docker exec laravel-app php artisan route:clear
docker exec laravel-app php artisan cache:clear
```

### Producción:
```bash
# Optimizar autoload
docker exec laravel-app composer dump-autoload --optimize

# Cache de configuración
docker exec laravel-app php artisan config:cache

# Cache de rutas
docker exec laravel-app php artisan route:cache
```

## 8. Troubleshooting (Solución de problemas)

### Problemas comunes:

**Laravel no responde a rutas API:**
- Verifica que `RouteServiceProvider` esté en `bootstrap/providers.php`
- Ejecuta `composer dump-autoload`

**Errores de autenticación:**
- Verifica que la tabla `personal_access_tokens` exista
- Ejecuta `php artisan migrate`

**Errores de base de datos:**
- Verifica que MySQL esté corriendo: `docker compose ps`
- Revisa la configuración en `config/database.php`

**Problemas de permisos:**
- Verifica permisos de carpetas `storage` y `bootstrap/cache`
- Ejecuta: `chmod -R 775 storage bootstrap/cache`

**Contenedores no inician:**
- Verifica logs: `docker logs laravel-app`
- Reconstruye: `docker compose down && docker compose up --build -d`

### Verificar instalación:
```bash
# Verificar que Sanctum esté instalado
docker exec laravel-app composer show laravel/sanctum

# Verificar que Permission esté instalado
docker exec laravel-app composer show spatie/laravel-permission

# Verificar migraciones
docker exec laravel-app php artisan migrate:status
```

## 9. Actualizaciones y Mantenimiento

### Para actualizar dependencias:
```bash
docker exec laravel-app composer update
docker exec laravel-app php artisan config:clear
```

### Para agregar nuevas librerías:
1. Agrega al `Dockerfile` si quieres que se instale automáticamente
2. O instala manualmente: `docker exec laravel-app composer require package-name`

### Para backups:
```bash
# Backup de base de datos
docker exec laravel-db mysqldump -u laravel -p laravel > backup.sql

# Backup de archivos
tar -czf backup.tar.gz backend/
```

---

**Nota:** Este proyecto está completamente automatizado. Cualquier desarrollador puede clonar el repositorio y ejecutar `docker compose up --build -d` para tener todo funcionando inmediatamente. 

para reiniciar:
'docker compose down && docker compose up -d --build'