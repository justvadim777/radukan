extends Control

# --- Game state ---
var coins: float = 0.0
var coins_per_click: float = 1.0
var coins_per_second: float = 0.0
var click_level: int = 0
var auto_level: int = 0

const CLICK_BASE_COST := 10.0
const AUTO_BASE_COST := 50.0
const COST_MULT := 1.6

# --- UI refs (set in _ready) ---
var coins_label: Label
var cps_label: Label
var coin_btn: Button
var click_btn: Button
var click_btn_label: Label
var auto_btn: Button
var auto_btn_label: Label
var float_container: Control

var timer: Timer

func _ready() -> void:
	_build_ui()
	timer = Timer.new()
	timer.wait_time = 0.1
	timer.autostart = true
	timer.timeout.connect(_on_tick)
	add_child(timer)

# ---------- UI construction ----------

func _build_ui() -> void:
	# Background
	var bg := ColorRect.new()
	bg.color = Color(0.01, 0.03, 0.08)
	bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(bg)

	# Top info panel
	var top := VBoxContainer.new()
	top.set_anchors_and_offsets_preset(Control.PRESET_TOP_WIDE)
	top.offset_top = 60
	top.offset_bottom = 180
	top.alignment = BoxContainer.ALIGNMENT_CENTER
	add_child(top)

	coins_label = Label.new()
	coins_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	coins_label.add_theme_font_size_override("font_size", 56)
	coins_label.add_theme_color_override("font_color", Color(1.0, 0.85, 0.1))
	top.add_child(coins_label)

	cps_label = Label.new()
	cps_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	cps_label.add_theme_font_size_override("font_size", 28)
	cps_label.add_theme_color_override("font_color", Color(0.7, 0.7, 0.7))
	top.add_child(cps_label)

	# Coin button (center)
	coin_btn = Button.new()
	coin_btn.text = "💰"
	coin_btn.add_theme_font_size_override("font_size", 120)
	coin_btn.set_anchors_and_offsets_preset(Control.PRESET_CENTER)
	coin_btn.offset_left = -140
	coin_btn.offset_right = 140
	coin_btn.offset_top = -140
	coin_btn.offset_bottom = 140
	coin_btn.flat = true
	coin_btn.pressed.connect(_on_coin_tap)
	add_child(coin_btn)

	# Shop panel at bottom
	var shop := VBoxContainer.new()
	shop.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_WIDE)
	shop.offset_top = -320
	shop.offset_bottom = -20
	shop.offset_left = 30
	shop.offset_right = -30
	shop.add_theme_constant_override("separation", 16)
	add_child(shop)

	var shop_title := Label.new()
	shop_title.text = "МАГАЗИН"
	shop_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	shop_title.add_theme_font_size_override("font_size", 28)
	shop_title.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5))
	shop.add_child(shop_title)

	click_btn = _make_shop_btn()
	shop.add_child(click_btn)
	click_btn_label = click_btn.get_child(0)
	click_btn.pressed.connect(_on_buy_click)

	auto_btn = _make_shop_btn()
	shop.add_child(auto_btn)
	auto_btn_label = auto_btn.get_child(0)
	auto_btn.pressed.connect(_on_buy_auto)

	# Floating numbers container
	float_container = Control.new()
	float_container.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	float_container.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(float_container)

	_update_ui()

func _make_shop_btn() -> Button:
	var btn := Button.new()
	btn.custom_minimum_size = Vector2(0, 100)
	btn.add_theme_font_size_override("font_size", 26)

	var style_normal := StyleBoxFlat.new()
	style_normal.bg_color = Color(0.08, 0.12, 0.22)
	style_normal.corner_radius_top_left = 16
	style_normal.corner_radius_top_right = 16
	style_normal.corner_radius_bottom_left = 16
	style_normal.corner_radius_bottom_right = 16
	btn.add_theme_stylebox_override("normal", style_normal)

	var style_hover := style_normal.duplicate()
	style_hover.bg_color = Color(0.12, 0.18, 0.32)
	btn.add_theme_stylebox_override("hover", style_hover)

	var style_pressed := style_normal.duplicate()
	style_pressed.bg_color = Color(0.06, 0.09, 0.16)
	btn.add_theme_stylebox_override("pressed", style_pressed)

	var style_disabled := style_normal.duplicate()
	style_disabled.bg_color = Color(0.05, 0.05, 0.08)
	btn.add_theme_stylebox_override("disabled", style_disabled)

	var lbl := Label.new()
	lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	lbl.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	lbl.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	lbl.add_theme_font_size_override("font_size", 26)
	lbl.add_theme_color_override("font_color", Color.WHITE)
	btn.add_child(lbl)

	return btn

# ---------- Game logic ----------

func click_upgrade_cost() -> float:
	return CLICK_BASE_COST * pow(COST_MULT, click_level)

func auto_upgrade_cost() -> float:
	return AUTO_BASE_COST * pow(COST_MULT, auto_level)

func _on_tick() -> void:
	coins += coins_per_second * 0.1
	_update_ui()

func _on_coin_tap() -> void:
	coins += coins_per_click
	_spawn_float("+%s" % fmt(coins_per_click))
	_animate_coin()
	_update_ui()

func _on_buy_click() -> void:
	var cost := click_upgrade_cost()
	if coins >= cost:
		coins -= cost
		click_level += 1
		coins_per_click += 1.0
		_update_ui()

func _on_buy_auto() -> void:
	var cost := auto_upgrade_cost()
	if coins >= cost:
		coins -= cost
		auto_level += 1
		coins_per_second += 1.0
		_update_ui()

func _animate_coin() -> void:
	var tw := create_tween()
	tw.tween_property(coin_btn, "scale", Vector2(0.88, 0.88), 0.06)
	tw.tween_property(coin_btn, "scale", Vector2(1.0, 1.0), 0.08)

func _spawn_float(text: String) -> void:
	var lbl := Label.new()
	lbl.text = text
	lbl.add_theme_font_size_override("font_size", 36)
	lbl.add_theme_color_override("font_color", Color(1.0, 0.9, 0.2))
	lbl.position = Vector2(randf_range(260, 460), 560)
	float_container.add_child(lbl)
	var tw := create_tween()
	tw.tween_property(lbl, "position:y", lbl.position.y - 120, 0.7)
	tw.parallel().tween_property(lbl, "modulate:a", 0.0, 0.7)
	tw.tween_callback(lbl.queue_free)

# ---------- UI update ----------

func _update_ui() -> void:
	coins_label.text = "💰 " + fmt(coins)
	cps_label.text = "%.1f монет/сек" % coins_per_second

	var cc := click_upgrade_cost()
	click_btn_label.text = "👆 Клик x%d → x%d\nСтоимость: %s монет" % [
		int(coins_per_click), int(coins_per_click + 1), fmt(cc)
	]
	click_btn.disabled = coins < cc

	var ac := auto_upgrade_cost()
	auto_btn_label.text = "⚙️ Авто +%d/сек → +%d/сек\nСтоимость: %s монет" % [
		int(coins_per_second), int(coins_per_second + 1), fmt(ac)
	]
	auto_btn.disabled = coins < ac

func fmt(n: float) -> String:
	if n >= 1_000_000_000:
		return "%.2fB" % (n / 1_000_000_000.0)
	elif n >= 1_000_000:
		return "%.2fM" % (n / 1_000_000.0)
	elif n >= 1_000:
		return "%.1fK" % (n / 1_000.0)
	else:
		return "%.0f" % n
