<!DOCTYPE html>
<html>

<head>
    <title>Edit Feature Flag</title>
</head>

<body>
    <h1>Edit Feature Flag</h1>

    <form method="POST" action="{{ route('admin.feature-flags.update', $featureFlag) }}">
        @csrf
        @method('PUT')
        @include('admin.feature-flags._form', ['featureFlag' => $featureFlag])
    </form>

    <a href="{{ route('admin.feature-flags.index') }}">Back</a>
</body>

</html>