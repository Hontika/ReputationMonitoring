@extends('layout')

@section('title', $company->name)

@section('content')
<div class="card">
    <div class="card-header">
        <h1>{{ $company->name }}</h1>
    </div>
    <div class="card-body">
        <p><strong>Twitter:</strong> {{ $company->twitter }}</p>
        <p><strong>Reddit:</strong> {{ $company->reddit }}</p>

        <h2>Company Data</h2>
        <ul class="list-group">
            @foreach($company->companyData as $data)
                <li class="list-group-item">Twitter Followers: {{ $data->twitter_followers }}</li>
                <li class="list-group-item">Reddit Members: {{ $data->reddit_members }}</li>
            @endforeach
        </ul>

        <h2>Users</h2>
        <ul class="list-group">
            @foreach($users as $user)
                <li class="list-group-item">{{ $user->name }} ({{ $user->email }})</li>
            @endforeach
        </ul>

        <a href="{{ route('companies.reddit-posts', $company->id) }}" class="btn btn-primary mt-3">View Reddit Posts</a>
    </div>
</div>
<a class="btn btn-secondary mt-3" href="{{ route('companies.index') }}">Back to Companies</a>
@endsection
