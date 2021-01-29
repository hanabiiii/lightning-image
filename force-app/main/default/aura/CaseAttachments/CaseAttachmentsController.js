({
	doInit: function(cmp, event, helper) {
		var action = cmp.get('c.getCaseAttachments');
        action.setParams({
            recordId: cmp.get('v.recordId')
        });
        
        cmp.set('v.showSpinner', true);
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === "SUCCESS") {
                cmp.set('v.showSpinner', false);
                
                var data = response.getReturnValue();
                console.log('data', data);
                var attachments = data.map(function(file) {
                    file.src = [{
                        source: file.previewUrls.replace('{renditionType}', 'THUMB120BY90'),
                        sourceSize: '120',
                        conditionSize: '576',
                        conditionSetSize: '120',
                    }, {
                        source: file.previewUrls.replace('{renditionType}', 'THUMB240BY180'),
                        sourceSize: '240',
                        conditionSize: '768',
                        conditionSetSize: 'THUMB120BY90',
                    }, {
                        source: file.previewUrls.replace('{renditionType}', 'THUMB720BY480'),
                        sourceSize: '720',
                        conditionSize: '1024',
                        conditionSetSize: '720',
                    }, {
                        source: file.previewUrls.replace('{renditionType}', 'THUMB720BY480'),
                        sourceSize: '720',
                        conditionSize: '1280',
                        conditionSetSize: '720',
                    }];
                    
                    return file;
                });
                console.log('attachments', attachments);
                cmp.set('v.attachments', attachments);
            }
            else if (state === "ERROR") {
                cmp.set('v.showSpinner', false);
                
                console.log('getCaseAttachments', response.getState(), response.getError());
            }
        });
        
        $A.enqueueAction(action); 
	},
    handleOnStartLoad: function(cmp, event) {
        console.log('onstartload');
    },
    handleOnLoad: function(cmp, event) {
        console.log('onload');
    },
    handleOnError: function(cmp, event) {
        console.log('onerror');
    }
})