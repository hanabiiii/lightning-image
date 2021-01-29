public with sharing class CaseAttachmentController {

    @AuraEnabled
    public static List<FileInfo> getCaseAttachments(String recordId) {
        Case[] caseCDLinks = Database.query('SELECT Id, (SELECT Id, ContentDocumentId, ShareType, Visibility From ContentDocumentLinks) FROM Case WHERE Id=:recordId');
        
        Set<String> cdIds = new Set<String>();
        for (Case c : caseCDLinks) {
            for (ContentDocumentLink cdl : c.ContentDocumentLinks) {
                System.debug(cdl.Id + ': ' + cdl.ShareType + ': ' + cdl.Visibility);
                cdIds.add(cdl.ContentDocumentId);
            }
        }
        List<FileInfo> files = new List<FileInfo>();
        if (cdIds.size() > 0) {
            String cvFields = 'ContentSize,Description,FileExtension,FileType,Id,IsAssetEnabled,IsDeleted,IsLatest,IsMajorVersion,PublishStatus,SharingOption,SharingPrivacy,TagCsv,TextPreview,Title,VersionNumber';
            ContentVersion[] cvs = Database.query('SELECT ' + cvFields + ' FROM ContentVersion WHERE ContentDocumentId IN :cdIds AND IsLatest=true');
            System.debug(cvs);
            
            for (ContentVersion cv : cvs) {
                FileInfo fileInfo = new FileInfo();
                fileInfo.id = cv.Id;
                fileInfo.title = cv.Title;
                fileInfo.fileType = cv.FileType;
                fileInfo.fileExtension = cv.FileExtension;
                fileInfo.contentSize = cv.ContentSize;
                fileInfo.description = cv.Description;
                fileInfo.versionNumber = cv.VersionNumber;
                fileInfo.versionId = cv.Id;
                
                String fileTypeMapping = fileTypeMap.get(cv.FileType);
                if (String.isNotBlank(fileTypeMapping)) {
                    fileInfo.iconName = 'doctype:' + fileTypeMapping;
                }
                
                String baseURL = URL.getSalesforceBaseUrl().toExternalForm();
                String renditionURL = baseURL + '/sfc/servlet.shepherd/version/renditionDownload?rendition={renditionType}&versionId=' + fileInfo.versionId;
                fileInfo.previewUrls = renditionURL;
    
                String downloadURL = baseURL + '/sfc/servlet.shepherd/version/download/' + fileInfo.versionId;
                fileInfo.downloadUrl = downloadURL;
                
                files.add(fileInfo);
            }
        }
        
        return files;
    }
    
    private static Map<String, String> fileTypeMap = new Map<String, String>
    {
        'BMP' => 'image',
        'CSV' => 'csv',
        'EXCEL' => 'excel',
        'EXCEL_X' => 'excel',
        'EXE' => 'exe',
        'GIF' => 'image',
        'JPG' => 'image',
        'LINK' => 'link',
        'MOV' => 'video',
        'MP4' => 'mp4',
        'PDF' => 'pdf',
        'PNG' => 'image',
        'POWER_POINT' => 'ppt',
        'POWER_POINT_X' => 'ppt',
        'RTF' => 'rtf',
        'TEXT' => 'txt',
        'UNKNOWN' => 'unknown',
        'VISIO' => 'visio',
        'WORD' => 'word',
        'WORD_X' => 'word',
        'XML' => 'xml',
        'ZIP' => 'zip'
    };
    
    public class FileInfo {
        @AuraEnabled public String id {get;set;}
        @AuraEnabled public String title {get;set;}
        @AuraEnabled public String fileType {get;set;}
        @AuraEnabled public String fileExtension {get;set;}
        @AuraEnabled public String description {get;set;}
        @AuraEnabled public Integer contentSize {get;set;}
        @auraEnabled public String iconName {get;set;}
        @AuraEnabled public String versionNumber {get;set;}
        @AuraEnabled public String versionId {get;set;}
        @AuraEnabled public String previewUrls {get;set;}
        @AuraEnabled public String downloadUrl {get;set;}
    }
}