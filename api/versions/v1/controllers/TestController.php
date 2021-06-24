<?php
/*
 * Nikola Radovic <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\versions\v1\controllers;

use api\components\responses\SuccessResponse;
use api\components\web\BaseApiController;
use Yii;

/**
 * Class TestController
 * @package api\versions\v1\controllers
 *
 */
class TestController extends BaseApiController
{
    /**
     * Get test data
     *
     * @rest\endpoint /test
     * @rest\method GET Test authentication
     * @rest\description Test your authorization token, by hitting this endpoint
     * @rest\tags Test
     * @rest\consumes application/json
     * @rest\consumes application/xml
     * @rest\produces application/json
     * @rest\produces application/xml
     * @rest\response 201 allof(SuccessResponse)
     * @rest\response 400 ErrorResponse
     */
    public function actionIndex()
    {
        return (new SuccessResponse([
            'test' => 'Authorization token is valid.',
        ]))->asArray();
    }
}
