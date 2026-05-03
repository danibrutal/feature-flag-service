<!DOCTYPE html>
<html>

<head>
    <title>Feature Flags</title>
</head>

<body>
    <h1>Feature Flags</h1>

    <a href="{{ route('admin.feature-flags.create') }}">Create new</a>

    @if(session('success'))
    <p style="color: green;">{{ session('success') }}</p>
    @endif

    <table border="1" cellpadding="8">
        <thead>
            <tr>
                <th>Key</th>
                <th>Name</th>
                <th>Enabled</th>
                <th>Type</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($flags as $flag)
            <tr>
                <td>{{ $flag->key }}</td>
                <td>{{ $flag->name }}</td>
                <td>{{ $flag->enabled ? 'Yes' : 'No' }}</td>
                <td>{{ $flag->rollout_type }}</td>
                <td>
                    <a href="{{ route('admin.feature-flags.edit', $flag) }}">Edit</a>

                    <form method="POST" action="{{ route('admin.feature-flags.destroy', $flag) }}" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>