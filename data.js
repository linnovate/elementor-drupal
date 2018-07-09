
var ElementorConfig = {
  "nonce": "0bd5cacd71",
  "post_id": 1,
  "document": {
    "id": 1,
    "type": "post",
    "remote_type": "post",
    "last_edited": "Draft saved on <time>Jun 17, 09:49</time> by admin",
    "messages": {
      "publish_notification": "Hurray! Your Page is live."
    },
    "urls": {
      "exit_to_dashboard": "http://localhost/wordpress/wp-admin/post.php?post=1&action=edit",
      "preview": "http://localhost/wordpress/index.php/2018/06/14/hello-world/?elementor-preview=1&ver=1529231135",
      "wp_preview": "http://localhost/wordpress/index.php/2018/06/14/hello-world/?preview_nonce=131e903652&preview=true",
      "permalink": "http://localhost/wordpress/index.php/2018/06/14/hello-world/"
    }
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
          "default_value": "",
          "type": "text",
          "tab": "settings",
          "section": "document_settings",
          "default": "Hello world!",
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
          "default_value": "",
          "type": "select",
          "tab": "settings",
          "section": "document_settings",
          "default": "publish",
          "name": "post_status"
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": {
            "unit": "px",
            "size": ""
          },
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
          "default_value": "",
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
          "default_value": {
            "unit": "px",
            "size": ""
          },
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
          "default_value": "",
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
          "default_value": {
            "unit": "px",
            "size": ""
          },
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
          "default_value": "",
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
          "dynamic": {
            "categories": [
              "image"
            ],
            "returnType": "object",
            "active": false
          },
          "features": [],
          "default_value": {
            "url": "",
            "id": ""
          },
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
        "background_video_fallback": {
          "label": "Background Fallback",
          "description": "This cover image will replace the background video on mobile and tablet devices.",
          "show_label": true,
          "label_block": true,
          "separator": "default",
          "dynamic": {
            "categories": [
              "image"
            ],
            "returnType": "object"
          },
          "features": [],
          "default_value": {
            "url": "",
            "id": ""
          },
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
          "default_value": {
            "unit": "px",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            "isLinked": true
          },
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
          "default_value": {
            "unit": "px",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            "isLinked": true
          },
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
          "default_value": {
            "unit": "px",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            "isLinked": true
          },
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
        },
        "advanced_settings": {
          "label": "Advanced",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "none",
          "features": [
            "ui"
          ],
          "type": "section",
          "tab": "settings",
          "name": "advanced_settings"
        },
        "clear_page": {
          "label": "Delete All Content",
          "description": "",
          "show_label": true,
          "label_block": false,
          "separator": "before",
          "text": "Delete",
          "event": "elementor:clearPage",
          "button_type": "default",
          "features": [
            "ui"
          ],
          "type": "button",
          "tab": "settings",
          "section": "advanced_settings",
          "name": "clear_page"
        }
      },
      "tabs": {
        "settings": "Settings",
        "style": "Style"
      },
      "settings": {
        "background_background": "classic",
        "background_color": "#b2b2b2",
        "template": "default",
        "post_title": "Hello world!",
        "post_status": "publish",
        "hide_title": "",
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
//         "title": "Global Settings",
//         "menu": {
//           "icon": "fa fa-cogs",
//           "beforeItem": "elementor-settings"
//         }
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
          "default_value": "",
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
  "wp_editor": "<div id=\"wp-elementorwpeditor-wrap\" class=\"wp-core-ui wp-editor-wrap tmce-active\"><div id=\"wp-elementorwpeditor-editor-tools\" class=\"wp-editor-tools hide-if-no-js\"><div id=\"wp-elementorwpeditor-media-buttons\" class=\"wp-media-buttons\"><button type=\"button\" id=\"insert-media-button\" class=\"button insert-media add_media\" data-editor=\"elementorwpeditor\"><span class=\"wp-media-buttons-icon\"></span> Add Media</button></div>\n<div class=\"wp-editor-tabs\"><button type=\"button\" id=\"elementorwpeditor-tmce\" class=\"wp-switch-editor switch-tmce\" data-wp-editor-id=\"elementorwpeditor\">Visual</button>\n<button type=\"button\" id=\"elementorwpeditor-html\" class=\"wp-switch-editor switch-html\" data-wp-editor-id=\"elementorwpeditor\">Text</button>\n</div>\n</div>\n<div id=\"wp-elementorwpeditor-editor-container\" class=\"wp-editor-container\"><div id=\"qt_elementorwpeditor_toolbar\" class=\"quicktags-toolbar\"></div><textarea class=\"elementor-wp-editor wp-editor-area\" style=\"height: 250px\" autocomplete=\"off\" cols=\"40\" name=\"elementorwpeditor\" id=\"elementorwpeditor\">%%EDITORCONTENT%%</textarea></div>\n</div>\n\n",
  "settings_page_link": "http://localhost/wordpress/wp-admin/admin.php?page=elementor",
  "elementor_site": "https://go.elementor.com/about-elementor/",
  "docs_elementor_site": "https://go.elementor.com/docs/",
  "help_the_content_url": "https://go.elementor.com/the-content-missing/",
  "help_preview_error_url": "https://go.elementor.com/preview-not-loaded/",
  "locked_user": false,
  "user": {
    "restrictions": [],
    "is_administrator": true
  },
  "is_rtl": false,
  "locale": "en_US",
  "viewportBreakpoints": {
    "xs": 0,
    "sm": 480,
    "md": 768,
    "lg": 1025
  },
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
  "i18n": {
    "elementor": "Elementor",
    "delete": "Delete",
    "cancel": "Cancel",
    "edit_element": "Edit %s",
    "about_elementor": "About Elementor",
    "color_picker": "Color Picker",
    "elementor_settings": "Dashboard Settings",
    "global_colors": "Default Colors",
    "global_fonts": "Default Fonts",
    "global_style": "Style",
    "settings": "Settings",
    "inner_section": "Columns",
    "asc": "Ascending order",
    "desc": "Descending order",
    "clear_page": "Delete All Content",
    "dialog_confirm_clear_page": "Attention: We are going to DELETE ALL CONTENT from this page. Are you sure you want to do that?",
    "back_to_editor": "Show Panel",
    "preview": "Hide Panel",
    "type_here": "Type Here",
    "an_error_occurred": "An error occurred",
    "category": "Category",
    "delete_template": "Delete Template",
    "delete_template_confirm": "Are you sure you want to delete this template?",
    "import_template_dialog_header": "Import Document Settings",
    "import_template_dialog_message": "Do you want to also import the document settings of the template?",
    "import_template_dialog_message_attention": "Attention: Importing may override previous settings.",
    "library": "Library",
    "no": "No",
    "page": "Page",
    "save_your_template": "Save Your %s to Library",
    "save_your_template_description": "Your designs will be available for export and reuse on any page or website",
    "section": "Section",
    "templates_empty_message": "This is where your templates should be. Design it. Save it. Reuse it.",
    "templates_empty_title": "Haven’t Saved Templates Yet?",
    "templates_no_favorites_message": "You can mark any pre-designed template as a favorite.",
    "templates_no_favorites_title": "No Favorite Templates",
    "templates_no_results_message": "Please make sure your search is spelled correctly or try a different words.",
    "templates_no_results_title": "No Results Found",
    "templates_request_error": "The following error(s) occurred while processing the request:",
    "yes": "Yes",
    "device_incompatible_header": "Your browser isn't compatible",
    "device_incompatible_message": "Your browser isn't compatible with all of Elementor's editing features. We recommend you switch to another browser like Chrome or Firefox.",
    "proceed_anyway": "Proceed Anyway",
    "learn_more": "Learn More",
    "preview_el_not_found_header": "Sorry, the content area was not found in your page.",
    "preview_el_not_found_message": "You must call 'the_content' function in the current template, in order for Elementor to work on this page.",
    "preview_not_loading_header": "The preview could not be loaded",
    "preview_not_loading_message": "We're sorry, but something went wrong. Click on 'Learn more' and follow each of the steps to quickly solve it.",
    "delete_gallery": "Reset Gallery",
    "dialog_confirm_gallery_delete": "Are you sure you want to reset this gallery?",
    "gallery_images_selected": "%s Images Selected",
    "gallery_no_images_selected": "No Images Selected",
    "insert_media": "Insert Media",
    "dialog_user_taken_over": "%s has taken over and is currently editing. Do you want to take over this page editing?",
    "go_back": "Go Back",
    "take_over": "Take Over",
    "delete_element": "Delete %s",
    "dialog_confirm_delete": "Are you sure you want to remove this %s?",
    "before_unload_alert": "Please note: All unsaved changes will be lost.",
    "published": "Published",
    "publish": "Publish",
    "save": "Save",
    "saved": "Saved",
    "update": "Update",
    "submit": "Submit",
    "working_on_draft_notification": "This is just a draft. Play around and when you're done - click update.",
    "keep_editing": "Keep Editing",
    "have_a_look": "Have a look",
    "view_all_revisions": "View All Revisions",
    "dismiss": "Dismiss",
    "saving_disabled": "Saving has been disabled until you’re reconnected.",
    "server_error": "Server Error",
    "server_connection_lost": "Connection Lost",
    "unknown_error": "Unknown Error",
    "autosave": "Autosave",
    "elementor_docs": "Documentation",
    "reload_page": "Reload Page",
    "session_expired_header": "Timeout",
    "session_expired_message": "Your session has expired. Please reload the page to continue editing.",
    "soon": "Soon",
    "unknown_value": "Unknown Value",
    "history": "History",
    "template": "Template",
    "added": "Added",
    "removed": "Removed",
    "edited": "Edited",
    "moved": "Moved",
    "duplicated": "Duplicated",
    "editing_started": "Editing Started",
    "edit_draft": "Edit Draft",
    "edit_published": "Edit Published",
    "no_revisions_1": "Revision history lets you save your previous versions of your work, and restore them any time.",
    "no_revisions_2": "Start designing your page and you'll be able to see the entire revision history here.",
    "current": "Current Version",
    "restore": "Restore",
    "restore_auto_saved_data": "Restore Auto Saved Data",
    "restore_auto_saved_data_message": "There is an autosave of this post that is more recent than the version below. You can restore the saved data fron the Revisions panel",
    "revision": "Revision",
    "revision_history": "Revision History",
    "revisions_disabled_1": "It looks like the post revision feature is unavailable in your website.",
    "revisions_disabled_2": "Learn more about <a target=\"_blank\" href=\"https://codex.wordpress.org/Revisions#Revision_Options\">WordPress revisions</a>"
  },
  "revisions": [],
  "revisions_enabled": true,
  "current_revision_id": "26"
}