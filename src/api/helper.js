import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import Datastore from "react-native-local-mongodb";
import { directories } from 'react-native-background-downloader'

export const getDatastore = async () => {
    return new Datastore({ filename: 'asyncStorageKey', storage: AsyncStorage, autoload: true })
};

export const getDeviceFreeStorage = async (data) => {
    return RNFS.getFSInfo()
        .then ((info) => {
            return Math.floor(info.freeSpace / 1000000000);
    })
}

export const saveDownload = async (data) => {
    try {
        const db = await getDatastore();
        const criteria = data.episodeId? {episodeId: data.episodeId } : { id: data.id };
         return db.findOne({ ...criteria }, function (err, doc) {
             if (!doc){
                 db.insert({
                     ...data,
                     createdAt: new Date()
                 }, function (err, newDoc) {
                 });
             }
        });

    } catch (e) {
        // saving error
    }
};

export const getDownloadedURL = (id) => {
    return `${directories.documents}/${id}`;
}

export const isVideoDownloaded = (identifier) => {
    return RNFS.exists(`${directories.documents}/${identifier}`).then((exists) => {
        return exists;
    });
};

export const removeStored = (criteria, id) => {
    console.log(criteria, id);
    getDatastore().then((db) => {
        db.remove(criteria, {

        }, function (err, numRemoved) {
            if (numRemoved){
                removeFile(id).catch();
            }
        });
    });
};

export const getValidVideos = async (docs) => {
    const data = [];
    for (let i = 0; i < docs.length; i++){
        const d = docs[i];
        const id = d.episodeId ? d.episodeId : d.id;
        const status = await isVideoDownloaded(id);
        if (!status){
            removeStored({ _id: d._id }, id);
        } else {
            const diff = 14 - diffInDays(new Date(d.createdAt), new Date());
            if (!diff){
                removeStored({ _id: d._id }, id);
            }else {
                const diff = 14 - diffInDays(new Date(d.createdAt), new Date());
                if (!diff){
                    removeStored({ _id: d._id }, id);
                } else {
                    data.push({
                        ...d,
                        daysLeft: diff,
                        url: `${directories.documents}/${id}`,
                        downloaded: true,
                    });
                }
            }
        }
    }

    return data;
};

export const isDownloaded = async (id) => {
    return getDatastore().then((db) => {
        return db.findOne({id}, (error, record) => {
            return record ? isVideoDownloaded(id) : false;
        })
    });
};

export const updateRecord = async (id, duration_time, current_time) => {
    return getDatastore().then((db) => {
        db.update(
            { _id: id },
            { $set: { duration_time, current_time } },
            {  }, function (err, numReplaced) {
        });
    });
};

export const diffInDays = (date1, date2) => {
    if (!date2) return -1;
    const Difference_In_Time = date2.getTime() - date1.getTime();
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};

export const removeFile = async (identifier) => {
    if (await isVideoDownloaded(identifier)){
        await RNFS.unlink(`${directories.documents}/${identifier}`).catch((err) => {
            console.log(err);
        });
    }
    return true;
};

