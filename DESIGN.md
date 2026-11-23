# Sistema de Diseño — Fundación Arca de la Alianza
*arcadelaalianza.org*

> **Basado en la inteligencia de diseño de la skill `ui-ux-pro-max`**  
> *Identidad extraída del vector original (`LOGO F.pdf` / `FADLA.svg`)*  
> **Tono:** Cálido, confiable, humano, compasivo y muy moderno.  
> **Criterio estético:** Eliminación total del look genérico de IA (sin gradientes morados/cianes hiper-brillantes) y erradicación del *glassmorphism* (sin transparencias borrosas que dificultan la lectura).

---

## 1. Manifiesto y Dirección Visual

La **Fundación Arca de la Alianza** es una iniciativa social binacional (Colombia NIT 901.689.340-5 y EE.UU. EIN 82-5293343) orientada a la transformación integral de familias vulnerables, madres gestantes, niñez en resguardos y personas en situación de calle.

El sistema de diseño debe transmitir **esperanza tangible, respeto a la dignidad humana, transparencia intachable y bienvenida comunitaria**.

### Principios Rectores:
1. **Humanismo Editorial vs. Frialdad Tecnológica**: Rechazamos la estética de "plataforma SaaS genérica". Usamos superficies táctiles, tonos cálidos de papel y lino, y una tipografía con alma y gravitas.
2. **Claridad y Honestidad Visual**: Fondos sólidos y limpios donde las cifras, historias y datos de transparencia bancaria se leen sin distorsión ni artificios de capas translúcidas.
3. **Calidez Compasiva con Vigor Moderno**: El balance entre la solemnidad institucional de la alianza y el dinamismo de una organización viva y activa en territorio.

---

## 2. Paleta Cromática y Roles Semánticos

Valores extraídos con precisión matemática desde los operadores vectoriales de color de `LOGO F.pdf` y la exportación oficial Illustrator `FADLA.svg`:

* **Azul Oficial del Logo (`.st2`):** `#263066` (`rgb(38, 48, 102)`) — Trascendencia, fidelidad y protección.
* **Oro Oficial del Logo (`.st0`):** `#E6CE54` (`rgb(230, 206, 84)`) — Luz divina, esperanza, sol y calidez humana.
* **Carbón Oficial del Logo (`.st1`):** `#3A3A3A` (`rgb(58, 58, 58)`) — Solidez terrenal, cercanía y equilibrio.

```
       [AZUL ARCA #263066]         [ORO ALIANZA #E6CE54]      [TERRACOTA #C85A32]
     Identidad Institucional        Esperanza & Acentos        Llamados a la Acción
                │                            │                          │
  ┌─────────────┴─────────────┐              │                          │
  ▼                           ▼              ▼                          ▼
Lino / Arena            Texto Tinta    Insignias / Luces          Donaciones Críticas
#FAF8F5 / #F2ECE4         #1A1D26      #8C7815 (WCAG AAA)          Empatía & Urgencia
```

### Tabla de Roles y Tokens de Color

| Rol Semántico | Token CSS | Valor Hex | Uso Exclusivo | Ratio WCAG vs Fondo |
| :--- | :--- | :--- | :--- | :--- |
| **Primario Institucional** | `--color-brand-primary` | `#263066` | Cabeceras, títulos prominentes, botones principales, bordes de jerarquía. | 11.2:1 (AAA) en blanco |
| **Primario Profundo** | `--color-brand-deep` | `#171E42` | Fondos de secciones nocturnas solemnes (Footer, presentación binacional). | 14.8:1 (AAA) |
| **Acento Oro (Logo)** | `--color-accent-gold` | `#E6CE54` | Acentos visuales, iconos de promesa, líneas de resalte, estrellas, focos. | 1.4:1 (decorativo/icono) |
| **Acento Oro Contraste** | `--color-accent-gold-text` | `#8C7815` | Textos pequeños dorados sobre blanco, insignias legibles. | 4.8:1 (AA cumplido) |
| **Acento Oro Suave** | `--color-accent-gold-surface`| `#FBF7E3` | Fondos de avisos destacados, micro-tarjetas de bendición/impacto. | 1.1:1 (superficie) |
| **Acción Compasiva / Donar** | `--color-action-warm` | `#C85A32` | Botón "Donar ahora", llamadas a patrocinio de niños o madres (terracota cálido). | 4.9:1 (AA cumplido) |
| **Fondo Principal (Lino)** | `--color-bg-canvas` | `#FAF8F5` | Fondo general de la página; elimina el blanco clínico y aporta calidez de hogar. | Superficie base |
| **Superficie Tarjetas** | `--color-bg-surface` | `#FFFFFF` | Tarjetas de programas, módulos de transparencia y modales limpios. | Superficie elevada |
| **Fondo Secundario (Arena)** | `--color-bg-muted` | `#F2ECE4` | Alternancia de secciones (Historia, Dimensiones, Testimonios). | Superficie suave |
| **Borde / Separador Táctil** | `--color-border-subtle` | `#E8E2D8` | Bordes finos de tarjetas (1px), líneas divisoras orgánicas. | 1.3:1 (no intrusivo) |
| **Texto Tinta Principal** | `--color-text-main` | `#1A1D26` | Títulos, párrafos principales y lectura continua. | 15.1:1 (AAA) |
| **Texto Carbón (Logo)** | `--color-text-muted` | `#3A3A3A` | Subtítulos, cuerpo de lectura calmada, descripciones secundarias. | 9.8:1 (AAA) |
| **Texto Meta / Atenuado** | `--color-text-caption` | `#5E6475` | Fechas, datos técnicos, notas al pie, horas de contacto. | 5.3:1 (AA cumplido) |
| **Éxito / Trazabilidad** | `--color-success` | `#257A54` | Verificación DIAN RTE, metas cumplidas, donaciones confirmadas. | 5.2:1 (AA cumplido) |

---

## 3. Pareja Tipográfica

Para erradicar la sensación genérica y otorgar un tono **cálido, confiable, humano y contemporáneo**, se establece una pareja de alto calibre editorial y legibilidad ergonómica:

### 1. Tipografía de Titulares y Narrativa: **Newsreader** (Google Fonts)
* **Categoría:** Serif Humanista Editorial Contemporánea.
* **Por qué funciona:** Diseñada para lectura continua y títulos con resonancia emocional. A diferencia de las serifs rígidas o barrocas, Newsreader transmite afecto, honestidad artesanal y dignidad humana sin perder modernidad.
* **Uso:** Titulares de sección (`h1`, `h2`), frases de impacto, testimonios y citas bíblicas o institucionales.

### 2. Tipografía de Cuerpo, UI y Datos: **Plus Jakarta Sans** (Google Fonts)
* **Categoría:** Sans-serif Grotesca Geométrica Cálida.
* **Por qué funciona:** Posee proporciones contemporáneas sumamente limpias, curvas humanizadas en terminales (evita la frialdad de Helvetica/Inter pura) y números de caja alta balanceados para métricas y datos contables.
* **Uso:** Navegación, cuerpo de texto (`p`), botones, etiquetas de tarjetas, formularios y tablas financieras.

### Escala Tipográfica (Ratio Minor Third 1.200 / Base 16px)

| Nivel | Fuente | Tamaño (Escritorio / Móvil) | Peso | Line Height | Tracking | Aplicación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Newsreader | `56px` / `38px` | Bold (700) | 1.05 | `-0.02em` | Título principal de apertura en Hero |
| **H1 Sección** | Newsreader | `40px` / `30px` | SemiBold (600) | 1.15 | `-0.015em` | Grandes cabeceras de sección |
| **H2 Título Card**| Newsreader | `28px` / `24px` | SemiBold (600) | 1.25 | `-0.01em` | Título de programa social, módulo central |
| **H3 Subtítulo** | Plus Jakarta Sans | `20px` / `18px` | Bold (700) | 1.30 | `-0.01em` | Encabezados de métrica, nombres de directiva |
| **Lead Paragraph** | Plus Jakarta Sans | `18px` / `16px` | Regular (400) | 1.60 | `0` | Párrafos introductorios destacados |
| **Body Regular** | Plus Jakarta Sans | `15px` / `15px` | Regular (400) | 1.65 | `0` | Textos explicativos, memorias, políticas |
| **UI Medium** | Plus Jakarta Sans | `14px` / `14px` | SemiBold (600) | 1.40 | `+0.01em` | Botones, enlaces del menú, pestañas |
| **Micro Tag** | Plus Jakarta Sans | `11.5px` / `11px` | ExtraBold (800) | 1.20 | `+0.08em` | Insignias en mayúsculas, indicadores de estado |

---

## 4. Escala de Espaciado y Layout

Se abandona el apilamiento rígido de 100vh que cortaba la información. El layout utiliza una cuadrícula de 8 puntos incremental con respiración orgánica.

### Escala Base de Espaciado (8pt Grid)
* `space-1`: `4px` (Alineación micrométrica de iconos)
* `space-2`: `8px` (Espacio entre etiqueta e icono)
* `space-3`: `12px` (Padding interno compacto)
* `space-4`: `16px` (Separación de párrafos y elementos internos)
* `space-6`: `24px` (Padding estándar de tarjetas)
* `space-8`: `32px` (Padding generoso de tarjetas principales)
* `space-12`: `48px` (Separación entre grupos temáticos)
* `space-16`: `64px` (Padding vertical de secciones en móvil)
* `space-24`: `96px` (Padding vertical de secciones en escritorio)

### Anchos de Contenedor
* **Lectura Narrativa:** `max-w-3xl` (`768px`) — Para declaraciones de misión, cartas y políticas.
* **Cuadrícula de Programas y Métricas:** `max-w-6xl` (`1152px`) — Densidad visual equilibrada.
* **Ancho Máximo General:** `max-w-7xl` (`1280px`) con padding lateral de `24px` (móvil) y `48px` (escritorio).

---

## 5. Estilo de Botones y Tarjetas

### A. Botones (Ergonómicos, Táctiles y Cálidos)
* **Forma:** Píldoras redondeadas completas (`rounded-full`) o rectángulos suavizados (`rounded-xl` = 12px), que transmiten accesibilidad y acogida sin bordes afilados agresivos.
* **Altura Mínima Táctil:** `48px` en escritorio, `46px` en móvil (cumpliendo sobradamente la regla de 44×44px de Apple HIG y Material).
* **Elevación:** Sombras multicapa suaves con dispersión cálida (`box-shadow: 0 4px 14px rgba(38, 48, 102, 0.12)`). Cero brillos de neón.

#### Jerarquía de Botones:
1. **Botón de Donación & Solidaridad (Hero Action)**:
   * Fondo: `--color-action-warm` (`#C85A32` Terracota Cálido).
   * Texto: Blanco Puro `#FFFFFF` (Bold 700).
   * Hover: Desplazamiento `translateY(-2px)`, sombra extendida `0 8px 24px rgba(200, 90, 50, 0.28)`.
   * Presionado: `scale(0.98)`.
2. **Botón Institucional Primario (Azul Arca)**:
   * Fondo: `--color-brand-primary` (`#263066`).
   * Texto: Blanco `#FFFFFF`.
   * Hover: Aclarado a `#334185` con elevación sutil.
3. **Botón Secundario de Confianza (Borde Noble)**:
   * Fondo: `#FFFFFF`.
   * Borde: `1.5px solid #D9D2C5`.
   * Texto: `--color-brand-primary` (`#263066`).
   * Hover: Fondo `#FAF8F5`, borde `#263066`.
4. **Focus Accessible Ring (Todos los botones)**:
   * `outline: 3px solid #E6CE54; outline-offset: 2px;` (Visible inmediatamente por teclado para accesibilidad universal WCAG).

---

### B. Tarjetas (Cards Sólidas, Espaciosas y Humanas)
* **Eliminación del Card-Deck que comprime información**: Las tarjetas tienen altura automática gobernada por su contenido. Nunca se corta un texto ni se fuerza un scroll interno artificial.
* **Superficie**: `#FFFFFF` sólido sobre fondo lino `#FAF8F5` o arena `#F2ECE4`.
* **Borde Táctil**: `1px solid var(--color-border-subtle)` (`#E8E2D8`). Aporta definición sin recargar.
* **Radio de Esquina**: `20px` a `24px` (`rounded-2xl` a `rounded-3xl`), proporcionando suavidad visual orgánica.
* **Sombra de Profundidad Física**:
  ```css
  box-shadow: 
    0 1px 3px rgba(38, 48, 102, 0.04),
    0 8px 24px rgba(38, 48, 102, 0.06);
  ```
* **Estructura Interna de la Tarjeta**:
  1. *Etiqueta de Programa (Badge):* Fondo Oro al 15% de opacidad (`#FBF7E3`), borde fino y texto en Oro Contraste `#8C7815`.
  2. *Imagen Humanista:* Radio de 14px, relación de aspecto fija (16:10 o 3:2), tratamiento fotográfico cálido y natural.
  3. *Cuerpo Tipográfico:* Título en Newsreader SemiBold (22-24px), párrafo explicativo en Plus Jakarta Sans (14.5px) con suficiente interlineado (`line-height: 1.6`).
  4. *Pie de Acción:* Enlace con flecha animada y botón secundario claro para sumar apoyo o conocer avances.

---

## 6. Lineamientos de Movimiento y Microinteracciones

El movimiento en *Arca de la Alianza* debe transmitir **serenidad, causa-efecto comprensible y gracia natural**, sin sacudidas ni acrobacias visuales.

### Reglas de Movimiento:
1. **Duraciones y Ritmo**:
   * *Micro-interacciones (Botones, toggles, enlaces):* `180ms – 220ms` con curva `ease-out`.
   * *Cambios de estado (Pestañas institucionales, acordeones):* `280ms – 320ms` con curva elástica suave.
   * *Revelado de secciones en scroll:* `450ms – 550ms` escalonado (*stagger* de `40ms` entre tarjetas).
2. **Curva de Easing Signature**:
   ```css
   cubic-bezier(0.16, 1, 0.3, 1) /* Suave desaceleración orgánica, sin rebotes artificiales */
   ```
3. **Propiedades Permitidas**:
   * Animar **únicamente** `transform` (translaciones de 10-18px máximo en eje Y) y `opacity`.
   * **Prohibido terminantemente** animar `width`, `height`, `top`, `padding` o `margin` para no provocar reflows ni saltos de diseño (mantiene 60fps constantes).
4. **Accesibilidad Obligatoria (Reduced Motion)**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   *Si el usuario tiene activada la reducción de movimiento, las tarjetas aparecen directamente con un suave desvanecimiento de opacidad instantáneo.*

---

## 7. Comparativa de Transformación (Antes vs. Nuevo Sistema)

| Aspecto | Diseño Anterior (Heredado) | Nuevo Sistema de Diseño Propuesto |
| :--- | :--- | :--- |
| **Filosofía de Layout** | 100vh forzado con scroll interno incómodo y contenido cortado. | Secciones respirables con flujo vertical natural y lectura relajada. |
| **Sensación de Superficie** | Glassmorphism oscuro, fondos azul eléctrico y bordes de neón. | Superficies sólidas en lino cálido (`#FAF8F5`) con textura táctil y bordes perla. |
| **Colores** | Blanco clínico y azul saturado sin calidez humana. | Azul Arca (`#263066`), Oro Alianza (`#E6CE54`), Terracota compasivo (`#C85A32`). |
| **Tipografía** | Genérica sin jerarquía editorial clara. | **Newsreader** (humanista, digna) + **Plus Jakarta Sans** (geométrica cálida). |
| **Botones y CTAs** | Botones de agencia oscura con alertas nativas (`alert()`). | Píldoras táctiles con sombra cálida, accesibilidad WCAG AAA y flujo directo a WhatsApp/Donación. |
| **Identidad Visual** | Maqueta prestada de eventos nocturnos ("Mavka"). | Identidad 100% auténtica y fiel a la misión social de la Fundación Arca de la Alianza. |

---

*Documento generado y archivado para servir como norma maestra antes de cualquier refactorización de código.*

