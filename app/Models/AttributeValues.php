<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AttributeValues extends Model {

    protected $table = 'product_parameters_values';
    protected $fillable = ['name'];
    protected $hidden = ['pivot', 'created_at', 'updated_at'];
    public function attributes(): BelongsToMany {
        return $this->belongsToMany(ProductAttributes::class, 'parameters_values', 'value_id', 'parameter_id');
    }

    public function products(): BelongsToMany {
        return $this->belongsToMany(Products::class, 'product_parameter_values', 'value_id', 'product_id');
    }

}
