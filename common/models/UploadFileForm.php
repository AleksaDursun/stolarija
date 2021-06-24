<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\models;


use common\components\orm\Model;
use Yii;
use yii\db\Exception;

class UploadFileForm extends Model
{
    public $files;
    public $modelClass;
    public $responseData = [];

    public function rules()
    {
        return [
            [['modelClass', 'files'], 'required'],
            [['folder_id', 'description', 'tagNames', 'id', 'files', 'storageType', 'clientId'], 'safe'],
        ];
    }

    public function save()
    {
        if (!$this->validate()) {
            return false;
        }

        $this->responseData = [];
        $transaction = Yii::$app->db->beginTransaction();
        try {
            foreach ($this->files as $file) {
                /** @var File $model */
                $model = new $this->modelClass;
                $model->file = $file;

                if (!$model->save()) {
                    throw new Exception(Yii::t('app', 'Could not save file. Details:{:error}', [
                        ':error' => implode('<br>', $model->getFirstErrors()),
                    ]));
                }

                $this->responseData[] = ['file_id' => $model->id, 'image_id' => $model->image_id];
            }
            $transaction->commit();

            return true;
        } catch (Exception $e) {
            $transaction->rollBack();
            $this->addError('files', $e->getMessage());
        }

        return false;
    }

}