/**
 * Created by hizbul on 5/28/17.
 */
CKEDITOR.plugins.add( 'accordion',
    {
        icons: 'accordion',
        init: function( editor )
        {
            //alert(this.path);
            editor.ui.addButton( 'accordion',
                {
                    label: 'Accordion',
                    command: 'CreateAccordion',
                    icon: this.path + 'icons/accordion.png'
                });
            editor.addCommand( 'CreateAccordion', new CKEDITOR.dialogCommand( 'CreateAccordion' ) );
            CKEDITOR.dialog.add( 'CreateAccordion', function( editor )
            {
                return {
                    title : 'Accordion Properties',
                    minWidth : 400,
                    minHeight : 200,
                    contents :
                        [
                            {
                                id : 'general',
                                label : 'Settings',
                                elements :
                                    [
                                        {
                                            type : 'text',
                                            id : 'item',
                                            label : 'Number of Item',
                                            validate : CKEDITOR.dialog.validate.notEmpty( 'The Displayed Text field cannot be empty.' ),
                                            required : true,
                                            default: 3,
                                            commit : function( data )
                                            {
                                                data.item = this.getValue();
                                            }
                                        }
                                    ]
                            }
                        ],
                    onOk : function()
                    {
                        var dialog = this,
                            data = {},
                            content = '',
                            accordion = editor.document.createElement( 'div' );

                        accordion.setAttribute('id', 'accordion');
                        accordion.setAttribute('class', 'panel-group');
                        accordion.setAttribute('role', 'tablist');

                        this.commitContent( data );

                        if(data.item) {
                            for(var i = 1; i <= data.item; i++) {
                                content += '<div class="panel panel-default">';
                                content +=     '<div class="panel-heading" role="tab" id="heading'+i+'">';
                                content +=         '<h4 class="panel-title">';
                                content +=             '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" aria-expanded="true" aria-controls="collapse'+i+'"> Collapsible Group Item #'+i+'</a>';
                                content +=         '</h4>';
                                content +=     '</div>';
                                content +=     '<div id="collapse'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+i+'">';
                                content +=         '<div class="panel-body">Enter your content for accordion item #'+i+'</div>';
                                content +=     '</div>';
                                content += '</div>';
                            }
                        }
                        accordion.setHtml(content);

                        editor.insertElement(accordion);
                    }
                };
            });
        }
    });

