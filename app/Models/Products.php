<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Products extends Model {

    protected $table = 'products';
    protected $fillable = ['name'];
    protected $hidden = ['pivot'];
    public function values(): BelongsToMany {
        return $this->belongsToMany(AttributeValues::class, 'product_parameter_values', 'product_id', 'value_id');
    }

    public function scopeFilters($query, $filters) {
        $i = 0;
        while ($i < count($filters)) {
            $query->join('product_parameter_values AS pv' .$i , 'products.id', '=', 'pv' .$i.'.product_id');
            $i++;
        }
        $i = 0;
        foreach ($filters as $filterValues) {
            $query->whereIn('pv'.$i. '.value_id', $filterValues);
            $i++;
        }
        $query->groupBy('products.id');
        return $query;
    }
}
