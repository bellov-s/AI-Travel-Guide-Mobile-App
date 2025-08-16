### Troubleshooting: Hydration mismatch на localhost
Если видите предупреждения вида “A tree hydrated but some attributes…” или в DOM появляются атрибуты `bis_*`, проверьте/отключите расширения браузера (они модифицируют HTML до гидратации React). 
Решение: инкогнито / профиль без расширений / `--disable-extensions`.
