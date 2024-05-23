@extends('layout')

@section('title', $company->name . ' - Reddit Posts')

@section('content')
<div class="container mt-5">
    <div class="card">
        <div class="card-header">
            <h1>Reddit Posts about {{ $company->name }}</h1>
        </div>
        <div class="card-body">
            <canvas id="redditPostsChart"></canvas>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    var ctx = document.getElementById('redditPostsChart').getContext('2d');
                    var chart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: {!! json_encode(array_column($redditPosts, 'title')) !!},
                            datasets: [{
                                label: 'Length of Reddit Posts',
                                data: {!! json_encode(array_map(function($post) { return strlen($post['body']); }, $redditPosts)) !!},
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                });
            </script>
            <ul class="list-group mt-3">
                @if (empty($redditPosts))
                    <li class="list-group-item">No Reddit posts found.</li>
                @else
                    @foreach($redditPosts as $post)
                        <li class="list-group-item">
                            <h5>{{ $post['title'] }}</h5>
                            <p>{{ $post['body'] }}</p>
                            <a href="{{ $post['url'] }}" class="btn btn-primary" target="_blank">Read more</a>
                        </li>
                    @endforeach
                @endif
            </ul>
        </div>
    </div>
    <a class="btn btn-secondary mt-3" href="{{ route('companies.show', $company->id) }}">Back to Company Details</a>
</div>
@endsection
