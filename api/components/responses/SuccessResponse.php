<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\components\responses;

/**
 * Class SuccessResponse
 * @package api\components\responses
 *
 * @rest\model SuccessResponse
 * @rest\property? boolean=true success Weather success was success or not. For success responses it is always `true`
 * @rest\example true
 * @rest\property? int[200,210]=200 code Response status code
 * @rest\example 200
 *
 *
 */
class SuccessResponse extends ApiResponse
{
    protected $status = 200;

    public function __construct($data, $status = null)
    {
        $this->setData($data);

        if ($status) {
            $this->setStatus($status);
        }

        parent::__construct();
    }

    public function asArray()
    {
        $data = [];
        $data['success'] = true;
        $data['code'] = $this->getStatus();
        $data['data'] = $this->getSerializedData();

        return $data;
    }
}