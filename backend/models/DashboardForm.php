<?php

namespace backend\models;

use common\helpers\ArrayHelper;
use common\helpers\CurrencyHelper;
use common\helpers\TimeHelper;
use common\models\Booking;
use common\models\Expense;
use common\models\Invoice;
use common\models\Sanation;
use common\models\search\CategorySearch;
use common\models\search\ExpenseSearch;
use common\models\search\InvoiceSearch;
use common\models\search\ProfitSearch;
use common\models\search\PropertySearch;
use common\models\search\SanationSearch;
use Yii;
use yii\base\Model;
use yiiunit\faker\data\providers\Book;

/**
 * ContactForm is the model behind the contact form.
 */

/**
 * Class DashboardForm
 * @package backend\models
 *
 * @property integer $property_id
 * @property integer $summary_month
 * @property integer $summary_year
 * @property integer $expense_month
 * @property integer $expense_year
 * @property integer $profit_year
 * @property integer $roi_year
 * @property string $currency
 */
class DashboardForm extends Model
{

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [[], 'safe'],
        ];
    }


}
