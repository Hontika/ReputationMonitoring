<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('type'); // either 'google_reviews' or 'subreddit_members'
            $table->float('goal', 3, 1)->nullable(); // specific for Google Reviews, float with one decimal place
            $table->float('progress', 3, 1)->nullable(); // specific for Google Reviews, float with one decimal place
            $table->boolean('new_members')->nullable(); // specific for Subreddit members
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
};
