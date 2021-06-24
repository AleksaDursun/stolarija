<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\models;


class LoginForm extends \common\models\LoginForm
{
    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if($user === null || !$user->validatePassword($this->password) ){
                $this->addError($attribute, 'Incorrect username or password.');
            } else if (!$user->isUserActive()) {
                $this->addError($attribute, 'User is inactive.');
            }
        }
    }
}