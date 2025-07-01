<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AttributeValues extends Model {

    protected $table = 'product_parameters_values';
    protected $fillable = ['name'];
    protected $hidden = ['pivot'];
    public function attributes(): BelongsToMany {
        return $this->belongsToMany(ProductAttributes::class, 'parameters_values', 'parameter_id', 'value_id');
    }

    public function products(): BelongsToMany {
        return $this->belongsToMany(Products::class, 'product_parameter_values', 'product_id', 'value_id');
    }
}
