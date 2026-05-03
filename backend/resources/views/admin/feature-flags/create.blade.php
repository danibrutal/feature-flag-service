<!DOCTYPE html>
<html>

<head>
    <title>Create Feature Flag</title>
</head>

<body>
    <h1>Create Feature Flag</h1>

    <form method="POST" action="{{ route('admin.feature-flags.store') }}">
        @csrf
        @include('admin.feature-flags._form')
    </form>

    <a href="{{ route('admin.feature-flags.index') }}">Back</a>
</body>

</html>