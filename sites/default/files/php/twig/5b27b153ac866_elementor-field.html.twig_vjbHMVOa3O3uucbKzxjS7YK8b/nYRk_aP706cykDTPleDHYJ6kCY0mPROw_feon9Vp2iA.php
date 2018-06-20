<?php

/* modules/elementor/templates/elementor-field.html.twig */
class __TwigTemplate_edaa7c194a87ba003b5c5236e82508c3253a011e500d9ed33d7f5b9e19238305 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array();
        $filters = array("json_encode" => 99);
        $functions = array();

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                array(),
                array('json_encode'),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 9
        echo "

    <script type=\"text/javascript\">
      /* <![CDATA[ */
      var elementorFrontendConfig = {
        \"isEditMode\": \"1\",
        \"is_rtl\": \"\",
        \"urls\": {
          \"assets\": \"http:\\/\\/localhost\\/wordpress\\/wp-content\\/plugins\\/elementor\\/assets\\/\"
        },
        \"settings\": {
          \"page\": [],
          \"general\": {
            \"elementor_global_image_lightbox\": \"yes\",
            \"elementor_enable_lightbox_in_editor\": \"yes\"
          }
        },
        \"post\": {
          \"id\": 1,
          \"title\": \"Hello world!\",
          \"excerpt\": \"\"
        },
        \"elements\": {
          \"data\": {},
          \"editSettings\": {},
          \"keys\": {
            \"section\": [\"background_background\", \"background_video_link\", \"shape_divider_top\", \"shape_divider_top_negative\", \"shape_divider_bottom\", \"shape_divider_bottom_negative\", \"animation\", \"animation_delay\"],
            \"column\": [\"animation\", \"animation_delay\"],
            \"common\": [\"_animation\", \"_animation_delay\"],
            \"heading\": [\"_animation\", \"_animation_delay\"],
            \"image\": [\"_animation\", \"_animation_delay\"],
            \"text-editor\": [\"drop_cap\", \"_animation\", \"_animation_delay\"],
            \"video\": [\"lightbox\", \"aspect_ratio\", \"lightbox_content_position\", \"lightbox_content_animation\", \"_animation\", \"_animation_delay\"],
            \"button\": [\"_animation\", \"_animation_delay\"],
            \"divider\": [\"_animation\", \"_animation_delay\"],
            \"spacer\": [\"_animation\", \"_animation_delay\"],
            \"image-box\": [\"_animation\", \"_animation_delay\"],
            \"google_maps\": [\"_animation\", \"_animation_delay\"],
            \"icon\": [\"_animation\", \"_animation_delay\"],
            \"icon-box\": [\"_animation\", \"_animation_delay\"],
            \"image-gallery\": [\"_animation\", \"_animation_delay\"],
            \"image-carousel\": [\"slides_to_show\", \"slides_to_show_tablet\", \"slides_to_show_mobile\", \"slides_to_scroll\", \"navigation\", \"pause_on_hover\", \"autoplay\", \"autoplay_speed\", \"infinite\", \"effect\", \"speed\", \"direction\", \"_animation\", \"_animation_delay\"],
            \"icon-list\": [\"_animation\", \"_animation_delay\"],
            \"counter\": [\"_animation\", \"_animation_delay\"],
            \"progress\": [\"_animation\", \"_animation_delay\"],
            \"testimonial\": [\"_animation\", \"_animation_delay\"],
            \"tabs\": [\"_animation\", \"_animation_delay\"],
            \"accordion\": [\"_animation\", \"_animation_delay\"],
            \"toggle\": [\"_animation\", \"_animation_delay\"],
            \"social-icons\": [\"_animation\", \"_animation_delay\"],
            \"alert\": [\"_animation\", \"_animation_delay\"],
            \"audio\": [\"_animation\", \"_animation_delay\"],
            \"shortcode\": [\"_animation\", \"_animation_delay\"],
            \"html\": [\"_animation\", \"_animation_delay\"],
            \"menu-anchor\": [\"_animation\", \"_animation_delay\"],
            \"sidebar\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-pages\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-calendar\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-archives\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-media_audio\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-media_image\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-media_gallery\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-media_video\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-meta\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-search\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-text\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-categories\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-recent-posts\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-recent-comments\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-rss\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-tag_cloud\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-nav_menu\": [\"_animation\", \"_animation_delay\"],
            \"wp-widget-custom_html\": [\"_animation\", \"_animation_delay\"]
          }
        }
      };
      /* ]]> */
    </script>
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=3.3.0\" type=\"text/css\">
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/font-awesome/css/font-awesome.min.css?ver=4.7.0\" type=\"text/css\">
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/e-select2/css/e-select2.min.css?ver=4.0.6-rc.1\" type=\"text/css\">
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=3.3.0\" type=\"text/css\">
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/animations/animations.min.css?ver=2.0.16\" type=\"text/css\">
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/css/editor-preview.min.css?ver=2.0.16\" type=\"text/css\">
<link rel=\"stylesheet\" href=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/css/frontend.min.css?ver=2.0.16\" type=\"text/css\">

<!--<script src=\"http://localhost/drupal/modules/elementor/q-elementor/data.js\"/></script>-->

<script type=\"text/javascript\">
  /* <![CDATA[ */
  let ElementorConfigData = \"";
        // line 99
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, twig_jsonencode_filter(($context["elementor_data"] ?? null)), "html", null, true));
        echo "\";
  ElementorConfigData = JSON.parse(ElementorConfigData.replace(/&quot;/g,'\"'));
  Object.assign(ElementorConfig.data, ElementorConfigData);
      /* ]]> */
</script>

<script src=\"http://localhost/drupal/modules/elementor/q-elementor/wp-includes/js/jquery/jquery.js\"></script>
<script src=\"http://localhost/drupal/modules/elementor/q-elementor/wp-includes/js/jquery/jquery-migrate.min.js\"></script>
<script src=\"http://localhost/drupal/modules/elementor/q-elementor/wp-includes/js/jquery/ui/position.min.js\"></script>

<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/slick/slick.min.js?ver=1.8.1\"></script>
<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/jquery-numerator/jquery-numerator.min.js?ver=0.2.1\"></script>
<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/inline-editor/js/inline-editor.min.js?ver=4.9.6\"></script>
<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/dialog/dialog.min.js?ver=4.3.2\"></script>
<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/waypoints/waypoints.min.js?ver=4.0.2\"></script>
<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/lib/swiper/swiper.jquery.min.js?ver=3.4.2\"></script>
<script type=\"text/javascript\" src=\"http://localhost/drupal/modules/elementor/q-elementor/elementor/assets/js/frontend.min.js?ver=2.0.16\"></script>


<div id=\"elementor\" class=\"elementor-edit-mode elementor elementor-1 elementor-edit-area-active\"></div>
";
    }

    public function getTemplateName()
    {
        return "modules/elementor/templates/elementor-field.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  135 => 99,  43 => 9,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "modules/elementor/templates/elementor-field.html.twig", "/home/stein/devel/drupal/modules/elementor/templates/elementor-field.html.twig");
    }
}
