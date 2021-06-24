Note module

* Add module namespace in composer
            
      "autoload" : {
           "psr-4": {
                 "notes\\": "app/modules/notes/"
           }
      },
      
* Add sumernote to composer 
        
      "marqu3s/yii2-summernote": "1.0.0"

* Add module in config
   
      'modules' => [
          'notes' => [
               'class' => 'app\modules\notes\Notes',
               'controllerNamespace' => 'app\modules\notes\controllers'
           ],
           ...
      ]
         
* Add NoteTrait on model that use notes

        use NoteTrait;
            
* Notes action in controller is needed

      'notes' => [
            'class' => ListAction::className(),
            'modelClass' => $this->modelClass,
            'createRedirectRoute' => 'project/notes',
            'subMenuView' => '//project/_project_nav',
            'panelOptions' => [
                  'title' => function ($model) {
                        return 'Project: ' . $model->name;
                  },
            ]
      ],
                    
* Grid Action
                    
      [
           'class' => ActionColumn::class,
           'template' => "{notes} {update} {delete}",
           'buttons' => [
                 'notes' => NoteHelper::initGridNoteButton('project-grid-id')
           ]
      ],