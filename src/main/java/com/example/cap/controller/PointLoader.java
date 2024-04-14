package com.example.cap.controller;

public class PointLoader {

    public void Init()
    {

    }

    //Singleton 패턴. 단 하나의 인스턴스로 모든 클래스에서 사용 가능.
   private static final PointLoader instance = new PointLoader();

   public static PointLoader getInstance() {
       return instance;
   }

   private PointLoader() {}
}
