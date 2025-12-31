import { createClient } from "@supabase/supabase-js";

const url = "https://oyhmssmiiddjxwdeeoip.supabase.co";
const key = "sb_publishable_R7KMPMmw9UwItMSzpMS9Gg_9RhUKUqK";

const supabase = createClient(url, key);

export default function MediaUpload(file) {
   const promise=new Promise(
    (resolve,reject)=>{
        if(file==null){
            reject("No file selected.Please select a file to upload");
            return;
        }
      const timeStamp=new Date().getTime();
      const fileName=timeStamp+"-"+file.name;

      supabase.storage.from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert:false
    }).then(
        ()=>{
            const publicUrl=supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
           
            resolve(publicUrl);
        }
    ).catch(
        ()=>{
           
            reject("Failed to upload file");
        }
    )}
)
return promise;
}