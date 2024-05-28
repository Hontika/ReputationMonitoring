<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('achievements', function (Blueprint $table) {
            $table->double('goal', 15, 8)->change();  // Adjust precision and scale according to your needs
        });
    }
    
    public function down()
    {
        Schema::table('achievements', function (Blueprint $table) {
            $table->float('goal', 3, 1)->change();  // Revert back to the original settings
        });
    }
};
