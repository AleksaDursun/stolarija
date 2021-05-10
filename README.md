BlackBox
========

# Development

To install development follow steps below:

## In windows:
1. Clone this project.
2. Run `npm install`
3. Run `gulp build`
4. Add this at the end of the windows hosts file `127.0.0.1 admin.umjetnostudrvetu.local api.umjetnostudrvetu.local`
5. Execute `docker-compose up`
6. Go into the project with `winpty docker-compose exec php-fpm bash` and in the docker container:
   - Run `apt-get update` 
   - Run `composer install`
   - Run `php init` and chose in which environment you want to run it
   - Run `php yii migrate`

7. Go into the project with `winpty docker-compose exec mariadb bash` and in the docker container:
   - Insert database dump with `mysql -u root -p umjetnost_u_drvetu < dump_name.sql` 

8. Start developing.


# Syncing
In php container run:
   - `php yii product/comtrade-update`


DIRECTORY STRUCTURE
-------------------

```
2ambox
    nginx                   nginx server configuration for local machine
common
    config/                 contains shared configurations
    mail/                   contains view files for e-mails
    models/                 contains model classes used in both backend and frontend
    tests/                  contains tests for common classes    
console
    config/                 contains console configurations
    controllers/            contains console controllers (commands)
    migrations/             contains database migrations
    models/                 contains console-specific model classes
    runtime/                contains files generated during runtime
api
    config/                 contains frontend configurations
    versions/v1/controllers contains Web controller classes
    models/                 contains frontend-specific model classes
    web/                    contains the entry script and Web resources
    components/             contains frontend widgets
backend
    assets/                 contains application assets such as JavaScript and CSS
    config/                 contains backend configurations
    controllers/            contains Web controller classes
    models/                 contains backend-specific model classes
    runtime/                contains files generated during runtime
    tests/                  contains tests for backend application    
    views/                  contains view files for the Web application
    web/                    contains the entry script and Web resources
vendor/                     contains dependent 3rd-party packages
environments/               contains environment-based overrides
theme/                      contains backend theme files
```
