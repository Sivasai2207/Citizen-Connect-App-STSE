import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveProfileUrl = async (id, url) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      profileUrl: url,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

export const addPost = async (postData, userId) => {
  try {
    await setDoc(
      doc(db, "posts", userId + "|" + Date.now().toString(36)),
      postData
    );

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
export const addStory = async (storyData, userId) => {
  try {
    await setDoc(
      doc(db, "story", userId + "|" + Date.now().toString(36)),
      storyData
    );

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
export const updateProflie = async (id, data) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      ...data,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

export const updatePost = async (id, data) => {
  try {
    const userRef = doc(db, "posts", id);
    await updateDoc(userRef, {
      ...data,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

// create a new function to delete story by id

export const deleteStory = async (id) => {
  try {
    await deleteDoc(doc(db, "story", id));
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
