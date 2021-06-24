<?php
/**
 *
 * var string $rentlio_api_key
 * var string $hrk_eur_rate
 */

namespace common\models;


use common\components\orm\Model;
use Yii;

class SettingsForm extends Model
{
    public $num_free_active_listings;

    public $num_posts_on_home;

    public $num_events_on_home;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['num_free_active_listings', 'num_posts_on_home', 'num_events_on_home'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'num_free_active_listings' => Yii::t('app', 'Number of free listings'),
            'num_posts_on_home' => Yii::t('app', 'Number of posts on home'),
            'num_events_on_home' => Yii::t('app', 'Number of events on home'),
        ];
    }

    public function init()
    {
        $this->num_free_active_listings = Settings::get('num_free_active_listings') ? : null;
        $this->num_posts_on_home = Settings::get('num_posts_on_home') ? : null;
        $this->num_events_on_home = Settings::get('num_events_on_home') ? : null;


        return parent::init();
    }

    public function save()
    {
        $transaction = Yii::$app->db->beginTransaction();

        try {
            foreach ($this->attributes as $key => $value) {
                Settings::set($key, $value);
            }

            $transaction->commit();
        } catch (\Exception $e) {
            $transaction->rollBack();
            throw $e;
        }

        return true;
    }
}
