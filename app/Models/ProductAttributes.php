<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductAttributes extends Model
{
    protected $table = 'product_parameters';
    protected $fillable = ['name'];
    protected $hidden = ['pivot'];

    public function values(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValues::class, 'parameters_values', 'parameter_id', 'value_id');
    }
}
