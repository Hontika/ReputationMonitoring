@extends('layout')

@section('title', 'Companies')

@section('content')
<div class="card">
    <div class="card-header">
        <h1>Companies</h1>
    </div>
    <div class="card-body">
        <ul class="list-group">
            @foreach($companies as $company)
                <li class="list-group-item">
                    <a href="{{ route('companies.show', $company->id) }}">{{ $company->name }}</a>
                </li>
            @endforeach
        </ul>
    </div>
</div>
@endsection
