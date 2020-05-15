
var ElementorConfig = {
  "nonce": "9164397c0c",
  "post_id": 1,
  "document": {
    "id": 1,
    "type": "post",
    "remote_type": "post",
    "last_edited": "Last edited on <time>Jul 10, 11:24</time> by admin",
    "panel": {
      "elements_categories": {
        "basic": {
          "title": "Basic",
          "icon": "eicon-font",
          "active": true
        },
        "pro-elements": {
          "title": "Pro"
        },
        "general": {
          "title": "General",
          "icon": "eicon-font",
          "active": true
        },
        "theme-elements": {
          "title": "Site",
          "active": false
        },
        "theme-elements-single": {
          "title": "Single",
          "active": false
        },
        "woocommerce-elements": {
          "title": "WooCommerce",
          "active": false
        },
        "pojo": {
          "title": "Pojo Themes",
          "icon": "eicon-pojome"
        },
        "wordpress": {
          "title": "WordPress",
          "icon": "eicon-wordpress",
          "active": false
        }
      },
      "messages": {
        "publish_notification": "Hurray! Your Document is live."
      }
    },
  },
  "autosave_interval": 60,
  "current_user_can_publish": true,
  "settings": {
    "page": {
      "name": "page",
      "panelPage": {
        "title": "Page Settings"
      },
      "cssWrapperSelector": "body.elementor-page-1",
      "controls": {
        "document_settings": {
          "label": "General Settings",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "features": [
            "ui"
          ],
          "type": "section",
          "tab": "settings",
          "name": "document_settings"
        },
        "post_title": {
          "label": "Title",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "none",
          "input_type": "text",
          "placeholder": "",
          "title": "",
          "dynamic": {
            "categories": [
              "text"
            ]
          },
          "features": [],
          "type": "text",
          "tab": "settings",
          "section": "document_settings",
          "default": "Elementor #1",
          "name": "post_title"
        },
        "post_status": {
          "label": "Status",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "draft": "Draft",
            "pending": "Pending Review",
            "private": "Private",
            "publish": "Published"
          },
          "features": [],
          "type": "select",
          "tab": "settings",
          "section": "document_settings",
          "default": "draft",
          "name": "post_status"
        },
        "post_excerpt": {
          "label": "Excerpt",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "rows": 5,
          "placeholder": "",
          "dynamic": {
            "categories": [
              "text"
            ]
          },
          "features": [],
          "type": "textarea",
          "tab": "settings",
          "section": "document_settings",
          "default": "",
          "name": "post_excerpt"
        },
        "post_featured_image": {
          "label": "Featured Image",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "media_type": "image",
          "dynamic": {
            "categories": [
              "image"
            ],
            "returnType": "object"
          },
          "features": [],
          "type": "media",
          "tab": "settings",
          "section": "document_settings",
          "default": {
            "url": false,
            "id": ""
          },
          "name": "post_featured_image"
        },
        "hide_title": {
          "label": "Hide Title",
          "description": "Not working? You can set a different selector for the title in the <a href=\"http://localhost/wordpress/wp-admin/admin.php?page=elementor#tab-style\" target=\"_blank\">Settings page</a>.",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "label_off": "No",
          "label_on": "Yes",
          "return_value": "yes",
          "features": [],
          "type": "switcher",
          "tab": "settings",
          "section": "document_settings",
          "selectors": {
            "{{WRAPPER}} h1.entry-title, .elementor-page-title": "display: none"
          },
          "name": "hide_title",
          "default": ""
        },
        "template": {
          "label": "Page Layout",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "default": "Default",
            "elementor_canvas": "Elementor Canvas",
            "elementor_header_footer": "Elementor Full Width"
          },
          "features": [],
          "type": "select",
          "tab": "settings",
          "section": "document_settings",
          "default": "default",
          "name": "template"
        },
        "template_default_description": {
          "label": "",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "raw": "Default Page Template from your theme",
          "content_classes": "elementor-descriptor",
          "features": [
            "ui"
          ],
          "type": "raw_html",
          "tab": "settings",
          "section": "document_settings",
          "condition": {
            "template": "default"
          },
          "name": "template_default_description"
        },
        "template_canvas_description": {
          "label": "",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "raw": "No header, no footer, just Elementor",
          "content_classes": "elementor-descriptor",
          "features": [
            "ui"
          ],
          "type": "raw_html",
          "tab": "settings",
          "section": "document_settings",
          "condition": {
            "template": "elementor_canvas"
          },
          "name": "template_canvas_description"
        },
        "template_header_footer_description": {
          "label": "",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "raw": "This template includes the header, full-width content and footer",
          "content_classes": "elementor-descriptor",
          "features": [
            "ui"
          ],
          "type": "raw_html",
          "tab": "settings",
          "section": "document_settings",
          "condition": {
            "template": "elementor_header_footer"
          },
          "name": "template_header_footer_description"
        },
        "section_page_style": {
          "label": "Body Style",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "features": [
            "ui"
          ],
          "type": "section",
          "tab": "style",
          "name": "section_page_style"
        },
        "background_background": {
          "label": "Background Type",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "classic": {
              "title": "Classic",
              "icon": "fa fa-paint-brush"
            },
            "gradient": {
              "title": "Gradient",
              "icon": "fa fa-barcode"
            }
          },
          "toggle": true,
          "features": [],
          "type": "choose",
          "tab": "style",
          "section": "section_page_style",
          "render_type": "ui",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-background",
          "name": "background_background",
          "default": ""
        },
        "background_color": {
          "label": "Color",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "alpha": true,
          "scheme": "",
          "features": [],
          "type": "color",
          "tab": "style",
          "section": "section_page_style",
          "default": "",
          "title": "Background Color",
          "selectors": {
            "{{WRAPPER}}": "background-color: {{VALUE}};"
          },
          "condition": {
            "background_background": [
              "classic",
              "gradient"
            ]
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-color",
          "name": "background_color"
        },
        "background_color_stop": {
          "label": "Location",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "size_units": [
            "%"
          ],
          "range": {
            "px": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "em": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "rem": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "%": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "deg": {
              "min": 0,
              "max": 360,
              "step": 1
            },
            "vh": {
              "min": 0,
              "max": 100,
              "step": 1
            }
          },
          "features": [],
          "type": "slider",
          "tab": "style",
          "section": "section_page_style",
          "default": {
            "unit": "%",
            "size": 0
          },
          "render_type": "ui",
          "condition": {
            "background_background": [
              "gradient"
            ]
          },
          "of_type": "gradient",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-color_stop",
          "name": "background_color_stop"
        },
        "background_color_b": {
          "label": "Second Color",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "alpha": true,
          "scheme": "",
          "features": [],
          "type": "color",
          "tab": "style",
          "section": "section_page_style",
          "default": "#f2295b",
          "render_type": "ui",
          "condition": {
            "background_background": [
              "gradient"
            ]
          },
          "of_type": "gradient",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-color_b",
          "name": "background_color_b"
        },
        "background_color_b_stop": {
          "label": "Location",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "size_units": [
            "%"
          ],
          "range": {
            "px": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "em": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "rem": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "%": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "deg": {
              "min": 0,
              "max": 360,
              "step": 1
            },
            "vh": {
              "min": 0,
              "max": 100,
              "step": 1
            }
          },
          "features": [],
          "type": "slider",
          "tab": "style",
          "section": "section_page_style",
          "default": {
            "unit": "%",
            "size": 100
          },
          "render_type": "ui",
          "condition": {
            "background_background": [
              "gradient"
            ]
          },
          "of_type": "gradient",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-color_b_stop",
          "name": "background_color_b_stop"
        },
        "background_gradient_type": {
          "label": "Type",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "linear": "Linear",
            "radial": "Radial"
          },
          "features": [],
          "type": "select",
          "tab": "style",
          "section": "section_page_style",
          "default": "linear",
          "render_type": "ui",
          "condition": {
            "background_background": [
              "gradient"
            ]
          },
          "of_type": "gradient",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-gradient_type",
          "name": "background_gradient_type"
        },
        "background_gradient_angle": {
          "label": "Angle",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "size_units": [
            "deg"
          ],
          "range": {
            "px": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "em": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "rem": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "%": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "deg": {
              "min": 0,
              "max": 360,
              "step": 10
            },
            "vh": {
              "min": 0,
              "max": 100,
              "step": 1
            }
          },
          "features": [],
          "type": "slider",
          "tab": "style",
          "section": "section_page_style",
          "default": {
            "unit": "deg",
            "size": 180
          },
          "selectors": {
            "{{WRAPPER}}": "background-color: transparent; background-image: linear-gradient({{SIZE}}{{UNIT}}, {{background_color.VALUE}} {{background_color_stop.SIZE}}{{background_color_stop.UNIT}}, {{background_color_b.VALUE}} {{background_color_b_stop.SIZE}}{{background_color_b_stop.UNIT}})"
          },
          "condition": {
            "background_background": [
              "gradient"
            ],
            "background_gradient_type": "linear"
          },
          "of_type": "gradient",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-gradient_angle",
          "name": "background_gradient_angle"
        },
        "background_gradient_position": {
          "label": "Position",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "center center": "Center Center",
            "center left": "Center Left",
            "center right": "Center Right",
            "top center": "Top Center",
            "top left": "Top Left",
            "top right": "Top Right",
            "bottom center": "Bottom Center",
            "bottom left": "Bottom Left",
            "bottom right": "Bottom Right"
          },
          "features": [],
          "type": "select",
          "tab": "style",
          "section": "section_page_style",
          "default": "center center",
          "selectors": {
            "{{WRAPPER}}": "background-color: transparent; background-image: radial-gradient(at {{VALUE}}, {{background_color.VALUE}} {{background_color_stop.SIZE}}{{background_color_stop.UNIT}}, {{background_color_b.VALUE}} {{background_color_b_stop.SIZE}}{{background_color_b_stop.UNIT}})"
          },
          "condition": {
            "background_background": [
              "gradient"
            ],
            "background_gradient_type": "radial"
          },
          "of_type": "gradient",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-gradient_position",
          "name": "background_gradient_position"
        },
        "background_image": {
          "label": "Image",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "media_type": "image",
          "dynamic": {
            "categories": [
              "image"
            ],
            "returnType": "object",
            "active": false
          },
          "features": [],
          "type": "media",
          "tab": "style",
          "section": "section_page_style",
          "title": "Background Image",
          "selectors": {
            "{{WRAPPER}}": "background-image: url(\"{{URL}}\");"
          },
          "condition": {
            "background_background": [
              "classic"
            ]
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-image",
          "name": "background_image",
          "default": {
            "url": "",
            "id": ""
          }
        },
        "background_position": {
          "label": "Position",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "": "Default",
            "top left": "Top Left",
            "top center": "Top Center",
            "top right": "Top Right",
            "center left": "Center Left",
            "center center": "Center Center",
            "center right": "Center Right",
            "bottom left": "Bottom Left",
            "bottom center": "Bottom Center",
            "bottom right": "Bottom Right"
          },
          "features": [],
          "type": "select",
          "tab": "style",
          "section": "section_page_style",
          "default": "",
          "selectors": {
            "{{WRAPPER}}": "background-position: {{VALUE}};"
          },
          "condition": {
            "background_background": [
              "classic"
            ],
            "background_image[url]!": ""
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-position",
          "name": "background_position"
        },
        "background_attachment": {
          "label": "Attachment",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "": "Default",
            "scroll": "Scroll",
            "fixed": "Fixed"
          },
          "features": [],
          "type": "select",
          "tab": "style",
          "section": "section_page_style",
          "default": "",
          "selectors": {
            "(desktop+){{WRAPPER}}": "background-attachment: {{VALUE}};"
          },
          "condition": {
            "background_background": [
              "classic"
            ],
            "background_image[url]!": ""
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-attachment",
          "name": "background_attachment"
        },
        "background_attachment_alert": {
          "label": "",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "raw": "Note: Attachment Fixed works only on desktop.",
          "content_classes": "elementor-control-field-description",
          "features": [
            "ui"
          ],
          "type": "raw_html",
          "tab": "style",
          "section": "section_page_style",
          "condition": {
            "background_background": [
              "classic"
            ],
            "background_image[url]!": "",
            "background_attachment": "fixed"
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-attachment_alert",
          "name": "background_attachment_alert"
        },
        "background_repeat": {
          "label": "Repeat",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "": "Default",
            "no-repeat": "No-repeat",
            "repeat": "Repeat",
            "repeat-x": "Repeat-x",
            "repeat-y": "Repeat-y"
          },
          "features": [],
          "type": "select",
          "tab": "style",
          "section": "section_page_style",
          "default": "",
          "selectors": {
            "{{WRAPPER}}": "background-repeat: {{VALUE}};"
          },
          "condition": {
            "background_background": [
              "classic"
            ],
            "background_image[url]!": ""
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-repeat",
          "name": "background_repeat"
        },
        "background_size": {
          "label": "Size",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "options": {
            "": "Default",
            "auto": "Auto",
            "cover": "Cover",
            "contain": "Contain"
          },
          "features": [],
          "type": "select",
          "tab": "style",
          "section": "section_page_style",
          "default": "",
          "selectors": {
            "{{WRAPPER}}": "background-size: {{VALUE}};"
          },
          "condition": {
            "background_background": [
              "classic"
            ],
            "background_image[url]!": ""
          },
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-size",
          "name": "background_size"
        },
        "background_video_link": {
          "label": "Video Link",
          "description": "YouTube link or video file (mp4 is recommended).",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "input_type": "text",
          "placeholder": "https://www.youtube.com/watch?v=9uOETcuFjbE",
          "title": "",
          "dynamic": {
            "categories": [
              "text"
            ]
          },
          "features": [],
          "type": "text",
          "tab": "style",
          "section": "section_page_style",
          "default": "",
          "condition": {
            "background_background": [
              "video"
            ]
          },
          "of_type": "video",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-video_link",
          "name": "background_video_link"
        },
        "background_video_start": {
          "label": "Start Time",
          "description": "Specify a start time (in seconds)",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "min": "",
          "max": "",
          "step": "",
          "placeholder": 10,
          "title": "",
          "features": [],
          "type": "number",
          "tab": "style",
          "section": "section_page_style",
          "condition": {
            "background_background": [
              "video"
            ]
          },
          "of_type": "video",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-video_start",
          "name": "background_video_start",
          "default": ""
        },
        "background_video_end": {
          "label": "End Time",
          "description": "Specify an end time (in seconds)",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "min": "",
          "max": "",
          "step": "",
          "placeholder": 70,
          "title": "",
          "features": [],
          "type": "number",
          "tab": "style",
          "section": "section_page_style",
          "condition": {
            "background_background": [
              "video"
            ]
          },
          "of_type": "video",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-video_end",
          "name": "background_video_end",
          "default": ""
        },
        "background_video_fallback": {
          "label": "Background Fallback",
          "description": "This cover image will replace the background video on mobile and tablet devices.",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "media_type": "image",
          "dynamic": {
            "categories": [
              "image"
            ],
            "returnType": "object"
          },
          "features": [],
          "type": "media",
          "tab": "style",
          "section": "section_page_style",
          "condition": {
            "background_background": [
              "video"
            ]
          },
          "selectors": {
            "{{WRAPPER}}": "background: url(\"{{URL}}\") 50% 50%; background-size: cover;"
          },
          "of_type": "video",
          "classes": "elementor-group-control-background elementor-group-control elementor-group-control-video_fallback",
          "name": "background_video_fallback",
          "default": {
            "url": "",
            "id": ""
          }
        },
        "padding": {
          "label": "Padding",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "size_units": [
            "px",
            "em",
            "%"
          ],
          "range": {
            "px": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "em": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "rem": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "%": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "deg": {
              "min": 0,
              "max": 360,
              "step": 1
            },
            "vh": {
              "min": 0,
              "max": 100,
              "step": 1
            }
          },
          "allowed_dimensions": "all",
          "placeholder": "",
          "features": [],
          "type": "dimensions",
          "tab": "style",
          "section": "section_page_style",
          "selectors": {
            "{{WRAPPER}}": "padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}"
          },
          "responsive": {
            "max": "desktop"
          },
          "name": "padding",
          "default": {
            "unit": "px",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            "isLinked": true
          }
        },
        "padding_tablet": {
          "label": "Padding",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "size_units": [
            "px",
            "em",
            "%"
          ],
          "range": {
            "px": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "em": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "rem": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "%": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "deg": {
              "min": 0,
              "max": 360,
              "step": 1
            },
            "vh": {
              "min": 0,
              "max": 100,
              "step": 1
            }
          },
          "allowed_dimensions": "all",
          "placeholder": "",
          "features": [],
          "type": "dimensions",
          "tab": "style",
          "section": "section_page_style",
          "selectors": {
            "{{WRAPPER}}": "padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}"
          },
          "responsive": {
            "max": "tablet"
          },
          "name": "padding_tablet",
          "default": {
            "unit": "px",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            "isLinked": true
          }
        },
        "padding_mobile": {
          "label": "Padding",
          "description": "",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "size_units": [
            "px",
            "em",
            "%"
          ],
          "range": {
            "px": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "em": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "rem": {
              "min": 0.1,
              "max": 10,
              "step": 0.1
            },
            "%": {
              "min": 0,
              "max": 100,
              "step": 1
            },
            "deg": {
              "min": 0,
              "max": 360,
              "step": 1
            },
            "vh": {
              "min": 0,
              "max": 100,
              "step": 1
            }
          },
          "allowed_dimensions": "all",
          "placeholder": "",
          "features": [],
          "type": "dimensions",
          "tab": "style",
          "section": "section_page_style",
          "selectors": {
            "{{WRAPPER}}": "padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}"
          },
          "responsive": {
            "max": "mobile"
          },
          "name": "padding_mobile",
          "default": {
            "unit": "px",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            "isLinked": true
          }
        },
        "section_custom_css_pro": {
          "label": "Custom CSS",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "features": [
            "ui"
          ],
          "type": "section",
          "tab": "style",
          "name": "section_custom_css_pro"
        },
        "custom_css_pro": {
          "label": "",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "raw": "<div class=\"elementor-panel-nerd-box\"><i class=\"elementor-panel-nerd-box-icon eicon-hypster\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t<div class=\"elementor-panel-nerd-box-title\">Meet Our Custom CSS</div>\n\t\t\t\t\t\t<div class=\"elementor-panel-nerd-box-message\">Custom CSS lets you add CSS code to any widget, and see it render live right in the editor.</div>\n\t\t\t\t\t\t<div class=\"elementor-panel-nerd-box-message\">This feature is only available on Elementor Pro.</div>\n\t\t\t\t\t\t<a class=\"elementor-panel-nerd-box-link elementor-button elementor-button-default elementor-go-pro\" href=\"https://elementor.com/pro/?utm_source=panel-custom-css&utm_campaign=gopro&utm_medium=wp-dash&utm_term=twentyseventeen\" target=\"_blank\">Go Pro</a>\n\t\t\t\t\t\t</div>",
          "content_classes": "",
          "features": [
            "ui"
          ],
          "type": "raw_html",
          "tab": "style",
          "section": "section_custom_css_pro",
          "name": "custom_css_pro"
        }
      },
      "tabs": {
        "settings": "Settings",
        "style": "Style"
      },
      "settings": {
        "template": "default",
        "post_title": "Elementor #1",
        "post_status": "draft",
        "post_excerpt": "",
        "post_featured_image": {
          "url": false,
          "id": ""
        },
        "hide_title": "",
        "background_background": "",
        "background_color": "",
        "background_color_stop": {
          "unit": "%",
          "size": 0
        },
        "background_color_b": "#f2295b",
        "background_color_b_stop": {
          "unit": "%",
          "size": 100
        },
        "background_gradient_type": "linear",
        "background_gradient_angle": {
          "unit": "deg",
          "size": 180
        },
        "background_gradient_position": "center center",
        "background_image": {
          "url": "",
          "id": ""
        },
        "background_position": "",
        "background_attachment": "",
        "background_repeat": "",
        "background_size": "",
        "background_video_link": "",
        "background_video_start": "",
        "background_video_end": "",
        "background_video_fallback": {
          "url": "",
          "id": ""
        },
        "padding": {
          "unit": "px",
          "top": "",
          "right": "",
          "bottom": "",
          "left": "",
          "isLinked": true
        },
        "padding_tablet": {
          "unit": "px",
          "top": "",
          "right": "",
          "bottom": "",
          "left": "",
          "isLinked": true
        },
        "padding_mobile": {
          "unit": "px",
          "top": "",
          "right": "",
          "bottom": "",
          "left": "",
          "isLinked": true
        }
      }
    },
    "general": {
      "name": "general",
      "panelPage": {
        "title": "Global Settings",
        "menu": {
          "icon": "fa fa-cogs",
          "beforeItem": "elementor-settings"
        }
      },
      "cssWrapperSelector": "",
      "controls": {
        "style": {
          "label": "Style",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "features": [
            "ui"
          ],
          "type": "section",
          "tab": "style",
          "name": "style"
        },
        "elementor_default_generic_fonts": {
          "label": "Default Generic Fonts",
          "description": "The list of fonts used if the chosen font is not available.",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "input_type": "text",
          "placeholder": "",
          "title": "",
          "dynamic": {
            "categories": [
              "text"
            ]
          },
          "features": [],
          "type": "text",
          "tab": "style",
          "section": "style",
          "default": "Sans-serif",
          "name": "elementor_default_generic_fonts"
        },
        "elementor_container_width": {
          "label": "Content Width (px)",
          "description": "Sets the default width of the content area (Default: 1140)",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "min": 0,
          "max": "",
          "step": "",
          "placeholder": "",
          "title": "",
          "features": [],
          "type": "number",
          "tab": "style",
          "section": "style",
          "selectors": {
            ".elementor-section.elementor-section-boxed > .elementor-container": "max-width: {{VALUE}}px"
          },
          "name": "elementor_container_width",
          "default": ""
        },
        "elementor_space_between_widgets": {
          "label": "Widgets Space (px)",
          "description": "Sets the default space between widgets (Default: 20)",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "min": 0,
          "max": "",
          "step": "",
          "placeholder": "20",
          "title": "",
          "features": [],
          "type": "number",
          "tab": "style",
          "section": "style",
          "selectors": {
            ".elementor-widget:not(:last-child)": "margin-bottom: {{VALUE}}px"
          },
          "name": "elementor_space_between_widgets",
          "default": ""
        },
        "elementor_stretched_section_container": {
          "label": "Stretched Section Fit To",
          "description": "Enter parent element selector to which stretched sections will fit to (e.g. #primary / .wrapper / main etc). Leave blank to fit to page width.",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "input_type": "text",
          "placeholder": "body",
          "title": "",
          "dynamic": {
            "categories": [
              "text"
            ]
          },
          "features": [],
          "type": "text",
          "tab": "style",
          "section": "style",
          "frontend_available": true,
          "name": "elementor_stretched_section_container",
          "default": ""
        },
        "elementor_page_title_selector": {
          "label": "Page Title Selector",
          "description": "Elementor lets you hide the page title. This works for themes that have \"h1.entry-title\" selector. If your theme's selector is different, please enter it above.",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "input_type": "text",
          "placeholder": "h1.entry-title",
          "title": "",
          "dynamic": {
            "categories": [
              "text"
            ]
          },
          "features": [],
          "type": "text",
          "tab": "style",
          "section": "style",
          "name": "elementor_page_title_selector",
          "default": ""
        },
        "lightbox": {
          "label": "Lightbox",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "features": [
            "ui"
          ],
          "type": "section",
          "tab": "lightbox",
          "name": "lightbox"
        },
        "elementor_global_image_lightbox": {
          "label": "Image Lightbox",
          "description": "Open all image links in a lightbox popup window. The lightbox will automatically work on any link that leads to an image file.",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "label_off": "No",
          "label_on": "Yes",
          "return_value": "yes",
          "features": [],
          "type": "switcher",
          "tab": "lightbox",
          "section": "lightbox",
          "default": "yes",
          "frontend_available": true,
          "name": "elementor_global_image_lightbox"
        },
        "elementor_enable_lightbox_in_editor": {
          "label": "Enable In Editor",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "label_off": "No",
          "label_on": "Yes",
          "return_value": "yes",
          "features": [],
          "type": "switcher",
          "tab": "lightbox",
          "section": "lightbox",
          "default": "yes",
          "frontend_available": true,
          "name": "elementor_enable_lightbox_in_editor"
        },
        "elementor_lightbox_color": {
          "label": "Background Color",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "alpha": true,
          "scheme": "",
          "features": [],
          "type": "color",
          "tab": "lightbox",
          "section": "lightbox",
          "selectors": {
            ".elementor-lightbox": "background-color: {{VALUE}}"
          },
          "name": "elementor_lightbox_color",
          "default": ""
        },
        "elementor_lightbox_ui_color": {
          "label": "UI Color",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "alpha": true,
          "scheme": "",
          "features": [],
          "type": "color",
          "tab": "lightbox",
          "section": "lightbox",
          "selectors": {
            ".elementor-lightbox .dialog-lightbox-close-button, .elementor-lightbox .elementor-swiper-button": "color: {{VALUE}}"
          },
          "name": "elementor_lightbox_ui_color",
          "default": ""
        },
        "elementor_lightbox_ui_color_hover": {
          "label": "UI Hover Color",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "default",
          "alpha": true,
          "scheme": "",
          "features": [],
          "type": "color",
          "tab": "lightbox",
          "section": "lightbox",
          "selectors": {
            ".elementor-lightbox .dialog-lightbox-close-button:hover, .elementor-lightbox .elementor-swiper-button:hover": "color: {{VALUE}}"
          },
          "name": "elementor_lightbox_ui_color_hover",
          "default": ""
        }
      },
      "tabs": {
        "style": "Style",
        "lightbox": "Lightbox"
      },
      "settings": {
        "elementor_default_generic_fonts": "Sans-serif",
        "elementor_container_width": "",
        "elementor_space_between_widgets": "",
        "elementor_stretched_section_container": "",
        "elementor_page_title_selector": "",
        "elementor_global_image_lightbox": "yes",
        "elementor_enable_lightbox_in_editor": "yes",
        "elementor_lightbox_color": "",
        "elementor_lightbox_ui_color": "",
        "elementor_lightbox_ui_color_hover": ""
      }
    }
  },
  "system_schemes": {
    "color": {
      "joker": {
        "title": "Joker",
        "items": {
          "1": "#202020",
          "2": "#b7b4b4",
          "3": "#707070",
          "4": "#f6121c"
        }
      },
      "ocean": {
        "title": "Ocean",
        "items": {
          "1": "#1569ae",
          "2": "#b6c9db",
          "3": "#545454",
          "4": "#fdd247"
        }
      },
      "royal": {
        "title": "Royal",
        "items": {
          "1": "#d5ba7f",
          "2": "#902729",
          "3": "#ae4848",
          "4": "#302a8c"
        }
      },
      "violet": {
        "title": "Violet",
        "items": {
          "1": "#747476",
          "2": "#ebca41",
          "3": "#6f1683",
          "4": "#a43cbd"
        }
      },
      "sweet": {
        "title": "Sweet",
        "items": {
          "1": "#6ccdd9",
          "2": "#763572",
          "3": "#919ca7",
          "4": "#f12184"
        }
      },
      "urban": {
        "title": "Urban",
        "items": {
          "1": "#db6159",
          "2": "#3b3b3b",
          "3": "#7a7979",
          "4": "#2abf64"
        }
      },
      "earth": {
        "title": "Earth",
        "items": {
          "1": "#882021",
          "2": "#c48e4c",
          "3": "#825e24",
          "4": "#e8c12f"
        }
      },
      "river": {
        "title": "River",
        "items": {
          "1": "#8dcfc8",
          "2": "#565656",
          "3": "#50656e",
          "4": "#dc5049"
        }
      },
      "pastel": {
        "title": "Pastel",
        "items": {
          "1": "#f27f6f",
          "2": "#f4cd78",
          "3": "#a5b3c1",
          "4": "#aac9c3"
        }
      }
    },
    "typography": [],
    "color-picker": {
      "joker": {
        "title": "Joker",
        "items": {
          "1": "#202020",
          "2": "#b7b4b4",
          "3": "#707070",
          "4": "#f6121c",
          "5": "#4b4646",
          "6": "#e2e2e2",
          "7": "#000",
          "8": "#fff"
        }
      },
      "ocean": {
        "title": "Ocean",
        "items": {
          "1": "#1569ae",
          "2": "#b6c9db",
          "3": "#545454",
          "4": "#fdd247",
          "5": "#154d80",
          "6": "#8c8c8c",
          "7": "#000",
          "8": "#fff"
        }
      },
      "royal": {
        "title": "Royal",
        "items": {
          "1": "#d5ba7f",
          "2": "#902729",
          "3": "#ae4848",
          "4": "#302a8c",
          "5": "#ac8e4d",
          "6": "#e2cea1",
          "7": "#000",
          "8": "#fff"
        }
      },
      "violet": {
        "title": "Violet",
        "items": {
          "1": "#747476",
          "2": "#ebca41",
          "3": "#6f1683",
          "4": "#a43cbd",
          "5": "#9c9ea6",
          "6": "#c184d0",
          "7": "#000",
          "8": "#fff"
        }
      },
      "sweet": {
        "title": "Sweet",
        "items": {
          "1": "#6ccdd9",
          "2": "#763572",
          "3": "#919ca7",
          "4": "#f12184",
          "5": "#41aab9",
          "6": "#ffc72f",
          "7": "#000",
          "8": "#fff"
        }
      },
      "urban": {
        "title": "Urban",
        "items": {
          "1": "#db6159",
          "2": "#3b3b3b",
          "3": "#7a7979",
          "4": "#2abf64",
          "5": "#aa4039",
          "6": "#94dbaf",
          "7": "#000",
          "8": "#fff"
        }
      },
      "earth": {
        "title": "Earth",
        "items": {
          "1": "#882021",
          "2": "#c48e4c",
          "3": "#825e24",
          "4": "#e8c12f",
          "5": "#aa6666",
          "6": "#efe5d9",
          "7": "#000",
          "8": "#fff"
        }
      },
      "river": {
        "title": "River",
        "items": {
          "1": "#8dcfc8",
          "2": "#565656",
          "3": "#50656e",
          "4": "#dc5049",
          "5": "#7b8c93",
          "6": "#eb6d65",
          "7": "#000",
          "8": "#fff"
        }
      },
      "pastel": {
        "title": "Pastel",
        "items": {
          "1": "#f27f6f",
          "2": "#f4cd78",
          "3": "#a5b3c1",
          "4": "#aac9c3",
          "5": "#f5a46c",
          "6": "#6e6f71",
          "7": "#000",
          "8": "#fff"
        }
      }
    }
  },
  "wp_editor": "<div id=\"wp-elementorwpeditor-wrap\" class=\"wp-core-ui wp-editor-wrap tmce-active\"><div id=\"wp-elementorwpeditor-editor-tools\" class=\"wp-editor-tools hide-if-no-js\"><div id=\"wp-elementorwpeditor-media-buttons\" class=\"wp-media-buttons\"><button type=\"button\" id=\"insert-media-button\" class=\"button insert-media add_media\" data-editor=\"elementorwpeditor\"><span class=\"wp-media-buttons-icon\"></span> Add Media</button></div>\n<div class=\"wp-editor-tabs\"><button type=\"button\" id=\"elementorwpeditor-tmce\" class=\"wp-switch-editor switch-tmce\" data-wp-editor-id=\"elementorwpeditor\">Visual</button>\n<button type=\"button\" id=\"elementorwpeditor-html\" class=\"wp-switch-editor switch-html\" data-wp-editor-id=\"elementorwpeditor\">Text</button>\n</div>\n</div>\n<div id=\"wp-elementorwpeditor-editor-container\" class=\"wp-editor-container\"><div id=\"qt_elementorwpeditor_toolbar\" class=\"quicktags-toolbar\"></div><textarea class=\"elementor-wp-editor wp-editor-area\" style=\"height: 250px\" autocomplete=\"off\" cols=\"40\" name=\"elementorwpeditor\" id=\"elementorwpeditor\">%%EDITORCONTENT%%</textarea></div>\n</div>\n\n",
  "settings_page_link": "",
  "elementor_site": "https://go.elementor.com/about-elementor/",
  "docs_elementor_site": "https://go.elementor.com/docs/",
  "help_the_content_url": "https://go.elementor.com/the-content-missing/",
  "help_preview_error_url": "https://go.elementor.com/preview-not-loaded/",
  "help_right_click_url": "https://go.elementor.com/meet-right-click/",
  "locked_user": false,
  "user": {
    "restrictions": [],
    "is_administrator": true,
    "introduction": true
  },
  "is_rtl": false,
  "locale": "en_US",
  "rich_editing_enabled": true,
  "page_title_selector": "h1.entry-title",
  "tinymceHasCustomConfig": false,
  "inlineEditing": {
    "toolbar": {
      "basic": [
        "bold",
        "underline",
        "italic"
      ],
      "advanced": {
        "0": "bold",
        "1": "underline",
        "2": "italic",
        "3": "createlink",
        "4": "unlink",
        "h1": [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "blockquote",
          "pre"
        ],
        "list": [
          "insertOrderedList",
          "insertUnorderedList"
        ]
      }
    }
  },
  "dynamicTags": {
    "tags": [],
    "groups": {
      "base": {
        "title": "Base Tags"
      }
    }
  },
  "revisions": [
    {
      "id": 1,
      "author": "admin",
      "timestamp": 1531221853,
      "date": "7 mins ago (Jul 10 @ 11:24)",
      "type": "current",
      "gravatar": "<img alt='' src='http://0.gravatar.com/avatar/614ae9974bd7f1de13322d66b887d994?s=22&#038;d=mm&#038;r=g' srcset='http://0.gravatar.com/avatar/614ae9974bd7f1de13322d66b887d994?s=44&#038;d=mm&#038;r=g 2x' class='avatar avatar-22 photo' height='22' width='22' />"
    }
  ],
  "revisions_enabled": true,
  "current_revision_id": 1
}