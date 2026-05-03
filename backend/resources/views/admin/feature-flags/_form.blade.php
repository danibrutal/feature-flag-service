<div>
    <label>Key</label>
    <input type="text" name="key" value="{{ old('key', $featureFlag->key ?? '') }}">
</div>

<div>
    <label>Name</label>
    <input type="text" name="name" value="{{ old('name', $featureFlag->name ?? '') }}">
</div>

<div>
    <label>
        <input type="checkbox" name="enabled" value="1"
            {{ old('enabled', $featureFlag->enabled ?? false) ? 'checked' : '' }}>
        Enabled
    </label>
</div>

<div>
    <label>Rollout Type</label>
    <select name="rollout_type">
        @foreach(['boolean', 'percentage', 'targeted'] as $type)
        <option value="{{ $type }}"
            {{ old('rollout_type', $featureFlag->rollout_type ?? 'boolean') === $type ? 'selected' : '' }}>
            {{ $type }}
        </option>
        @endforeach
    </select>
</div>

<div>
    <label>Rollout Value</label>
    <input type="number" name="rollout_value"
        value="{{ old('rollout_value', $featureFlag->rollout_value ?? '') }}">
</div>

<div>
    <label>Starts At</label>
    <input type="datetime-local" name="starts_at"
        value="{{ old('starts_at', isset($featureFlag->starts_at) ? $featureFlag->starts_at->format('Y-m-d\TH:i') : '') }}">
</div>

<div>
    <label>Ends At</label>
    <input type="datetime-local" name="ends_at"
        value="{{ old('ends_at', isset($featureFlag->ends_at) ? $featureFlag->ends_at->format('Y-m-d\TH:i') : '') }}">
</div>

<br>
<button type="submit">Save</button>