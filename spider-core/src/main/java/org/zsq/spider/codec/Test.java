package org.zsq.spider.codec;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.util.HashMap;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;

public class Test {

	/**
	 * 
	 * 创建日期2011-4-25上午10:12:38
	 * 修改日期
	 * 作者：dh *TODO 使用Base64加密算法加密字符串
	 *return
	 */
	public static String base64EncodeStr(String plainText){
		byte[] b=plainText.getBytes();
		Base64 base64=new Base64();
		b=base64.encode(b);
		String s=new String(b);
		return s;
	}
	
	/**
	 * 
	 * 创建日期2011-4-25上午10:15:11
	 * 修改日期
	 * 作者：dh	 *TODO 使用Base64加密
	 *return
	 */
	public static String base64DecodeStr(String encodeStr){
		byte[] b=encodeStr.getBytes();
		Base64 base64=new Base64();
		b=base64.decode(b);
		String s=new String(b);
		return s;
	}
	
	/** 
     * 生成公钥和私钥 
     * @throws NoSuchAlgorithmException  
     * 
     */  
    public static HashMap<String, Object> getKeys() throws NoSuchAlgorithmException{  
        HashMap<String, Object> map = new HashMap<String, Object>();  
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");  
        keyPairGen.initialize(1024);  
        KeyPair keyPair = keyPairGen.generateKeyPair();  
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();  
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();  
        map.put("public", publicKey);  
        map.put("private", privateKey);  
        return map;  
    }  
    /** 
     * 使用模和指数生成RSA公钥 
     * 注意：【此代码用了默认补位方式，为RSA/None/PKCS1Padding，不同JDK默认的补位方式可能不同，如Android默认是RSA 
     * /None/NoPadding】 
     *  
     * @param modulus 
     *            模 
     * @param exponent 
     *            指数 
     * @return 
     */  
    public static RSAPublicKey getPublicKey(String modulus, String exponent) {  
        try {  
            BigInteger b1 = new BigInteger(modulus);  
            BigInteger b2 = new BigInteger(exponent);  
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");  
            RSAPublicKeySpec keySpec = new RSAPublicKeySpec(b1, b2);  
            return (RSAPublicKey) keyFactory.generatePublic(keySpec);  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
  
    /** 
     * 使用模和指数生成RSA私钥 
     * 注意：【此代码用了默认补位方式，为RSA/None/PKCS1Padding，不同JDK默认的补位方式可能不同，如Android默认是RSA 
     * /None/NoPadding】 
     *  
     * @param modulus 
     *            模 
     * @param exponent 
     *            指数 
     * @return 
     */  
    public static RSAPrivateKey getPrivateKey(String modulus, String exponent) {  
        try {  
            BigInteger b1 = new BigInteger(modulus);  
            BigInteger b2 = new BigInteger(exponent);  
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");  
            RSAPrivateKeySpec keySpec = new RSAPrivateKeySpec(b1, b2);  
            return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
  
    /** 
     * 公钥加密 
     *  
     * @param data 
     * @param publicKey 
     * @return 
     * @throws Exception 
     */  
    public static String encryptByPublicKey(String data, RSAPublicKey publicKey)  
            throws Exception {  
        Cipher cipher = Cipher.getInstance("RSA");  
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);  
        // 模长  
        int key_len = publicKey.getModulus().bitLength() / 8;  
        // 加密数据长度 <= 模长-11  
        String[] datas = splitString(data, key_len - 11);  
        String mi = "";  
        //如果明文长度大于模长-11则要分组加密  
        for (String s : datas) {  
            mi += bcd2Str(cipher.doFinal(s.getBytes()));  
        }  
        return mi;  
    }  
  
    /** 
     * 私钥解密 
     *  
     * @param data 
     * @param privateKey 
     * @return 
     * @throws Exception 
     */  
    public static String decryptByPrivateKey(String data, RSAPrivateKey privateKey)  
            throws Exception {  
        Cipher cipher = Cipher.getInstance("RSA");  
        cipher.init(Cipher.DECRYPT_MODE, privateKey);  
        //模长  
        int key_len = privateKey.getModulus().bitLength() / 8;  
        byte[] bytes = data.getBytes();  
        byte[] bcd = ASCII_To_BCD(bytes, bytes.length);  
        System.err.println(bcd.length);  
        //如果密文长度大于模长则要分组解密  
        String ming = "";  
        byte[][] arrays = splitArray(bcd, key_len);  
        for(byte[] arr : arrays){  
            ming += new String(cipher.doFinal(arr));  
        }  
        return ming;  
    }  
    /** 
     * ASCII码转BCD码 
     *  
     */  
    public static byte[] ASCII_To_BCD(byte[] ascii, int asc_len) {  
        byte[] bcd = new byte[asc_len / 2];  
        int j = 0;  
        for (int i = 0; i < (asc_len + 1) / 2; i++) {  
            bcd[i] = asc_to_bcd(ascii[j++]);  
            bcd[i] = (byte) (((j >= asc_len) ? 0x00 : asc_to_bcd(ascii[j++])) + (bcd[i] << 4));  
        }  
        return bcd;  
    }  
    public static byte asc_to_bcd(byte asc) {  
        byte bcd;  
  
        if ((asc >= '0') && (asc <= '9'))  
            bcd = (byte) (asc - '0');  
        else if ((asc >= 'A') && (asc <= 'F'))  
            bcd = (byte) (asc - 'A' + 10);  
        else if ((asc >= 'a') && (asc <= 'f'))  
            bcd = (byte) (asc - 'a' + 10);  
        else  
            bcd = (byte) (asc - 48);  
        return bcd;  
    }  
    /** 
     * BCD转字符串 
     */  
    public static String bcd2Str(byte[] bytes) {  
        char temp[] = new char[bytes.length * 2], val;  
  
        for (int i = 0; i < bytes.length; i++) {  
            val = (char) (((bytes[i] & 0xf0) >> 4) & 0x0f);  
            temp[i * 2] = (char) (val > 9 ? val + 'A' - 10 : val + '0');  
  
            val = (char) (bytes[i] & 0x0f);  
            temp[i * 2 + 1] = (char) (val > 9 ? val + 'A' - 10 : val + '0');  
        }  
        return new String(temp);  
    }  
    
    
    /** 
     * 拆分字符串 
     */  
    public static String[] splitString(String string, int len) {  
        int x = string.length() / len;  
        int y = string.length() % len;  
        int z = 0;  
        if (y != 0) {  
            z = 1;  
        }  
        String[] strings = new String[x + z];  
        String str = "";  
        for (int i=0; i<x+z; i++) {  
            if (i==x+z-1 && y!=0) {  
                str = string.substring(i*len, i*len+y);  
            }else{  
                str = string.substring(i*len, i*len+len);  
            }  
            strings[i] = str;  
        }  
        return strings;  
    }  
    /** 
     *拆分数组  
     */  
    public static byte[][] splitArray(byte[] data,int len){  
        int x = data.length / len;  
        int y = data.length % len;  
        int z = 0;  
        if(y!=0){  
            z = 1;  
        }  
        byte[][] arrays = new byte[x+z][];  
        byte[] arr;  
        for(int i=0; i<x+z; i++){  
            arr = new byte[len];  
            if(i==x+z-1 && y!=0){  
                System.arraycopy(data, i*len, arr, 0, y);  
            }else{  
                System.arraycopy(data, i*len, arr, 0, len);  
            }  
            arrays[i] = arr;  
        }  
        return arrays;  
    }  
    
    
    public static void main(String[] args) throws Exception {
    	 /*// TODO Auto-generated method stub  
        HashMap<String, Object> map = Test.getKeys();  
        //生成公钥和私钥  
        RSAPublicKey publicKey = (RSAPublicKey) map.get("public");  
        RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");  
          
        //模  
        String modulus = publicKey.getModulus().toString();  
        //公钥指数  
        String public_exponent = publicKey.getPublicExponent().toString();
        System.out.println("公钥==");
        System.out.println(public_exponent);
        //私钥指数  
        String private_exponent = privateKey.getPrivateExponent().toString();
        System.out.println("私钥==");
        System.out.println(private_exponent);
        //明文  
        String plainText = "我是一个好人";  
        //使用模和指数生成公钥和私钥  
        RSAPublicKey pubKey = Test.getPublicKey(modulus, public_exponent);  
        RSAPrivateKey priKey = Test.getPrivateKey(modulus, private_exponent);  
        //加密后的密文  
        String mi = Test.encryptByPublicKey(plainText, pubKey);  
        System.err.println(mi);  
        //解密后的明文  
        plainText = Test.decryptByPrivateKey(mi, priKey);  
        System.err.println(plainText);
        
        
        String base64 = Test.base64EncodeStr(plainText);
        System.out.println(Test.base64DecodeStr(base64));
        */
        String miyao = "m8cuFS77E7MyspqAYqPwUQSTHaCeB3ckMEkJidvRrBoTy99LbPhd8dEXjAVezpjtbCE8og3+1h+Cxg6iksiURVLVD7F2VlE+EybZfaryUS9OMPIguQMX5E+C4u3Ayv08qTm+5WUB+tfVsqYmBjO/GNIpCoKaRif/PrMNgm8sk4qrsjnNrxN2xnc7Tn80hy6ypJ1bIszQpEUInv37uW3JvhLrFTrq2HrXdtujc1oOgHgnMS+TRAQiE/BtgqFa82W1yrQVp3XCg5IEQWzaRBwzf1AK/3xj6RjAZkA1+0vwyYGrEsMuVKJJ6A6CMspE6H5NJS3HUeGH5vqE9gzcY1/3kQ==</Modulus><Exponent>AQAB</Exponent><P>yUP9ESI2lDHyR7CpLdAq6wcNjwyQ/6LxZvr9gk6CtWQvPC3NhFHXOq76rIGH7pvP69vdm2+KK/SJNsOLPkRU5l+UPcrbAIIjLCmVqRGNlqMx8hvOR7WVOZnflAyKkRLsj7qezXShmcXmh+Tpw86Ev2A158i6X7MwcfzPui72HDc=</P><Q>xiRfITc+6uJXBWpmC28OfjMB0WWrmaB1HptdSXcw2TZkFqFSLEpE1c3vuzgx8ebMTXw4ecF9QYnId7npXLqzTHw++1z+jM/QdcqIS7Bvqk6h2m8ASDT3Xq2TguVfcahMRb0eAmxD4cTAOJGesnMDrqa1oIRb6NZY5rG0e9kE9nc=</Q><DP>YMoWgM/gSYJ/jmRx57tNeHuK1LlpXdbhmvGnSqwxBcSpRpqMVE77X5hYqu8cDO7Xngi9WQvZ+et+tVxysT4xShy68MCGc4ciHRHejFEJs2DGGzWuDSRRIENUlyE03jGonDJWPl4RfR8ED2RR2z2M72/4XIBWyMEm0hqPV21QJB8=</DP><DQ>AjXHpdwy5HXP2KyeJMSBWeEBxS8oIdeLVuMOwFIHBnU32pTEEOBnMidQ5Dq1O+iCIN8g1iLVXdTGmqdFNhaTB2hfX3hjEnkC7z1qFcYLCNBFt+UDEMseczzmZ1BdpyvkZea9HfPNMgh6yGa/aWglA16yqe6wA8HYTgJva+44wvM=</DQ><InverseQ>RuCHHiXPBDU7u2xT7oXNmJqdbWIvcCorWbpklzA9+mYIj0pTJ+F5Cwleg8v4ckJKcLnb7XwzRobZ3GBcnETttU3EqJS2rtWS91QvQYN7XNPsTPisnb6fifWu+CVswWIYvUU4AdRHxmpO/Aa8i2IAdm92Wwu953nrVRssZKQCAn8=</InverseQ><D>R4n8VswhkBV+ldkwVpx1E6/nI/cMO99yJh6Um9PwgXnkV38vc1bIRfJBPxOES5qdhkfpQX7t5kXIV86GyKQGu6Njp3ZXIyLiQAdaYETuTWxNG1tGvdB222nMcQzAujf78LdNPKnbc+hFAmsdEUIYY3y4TlRWJxvdM10lOh52OTcBX8a+vF30T8aaGtM1cgFqet3DH+zLEdh+EqxmrCZ9XDsPojqEzw6zkDtBs2ilVmz22PnFFVEqWX/yt5yqdr2vEKcBfDUvlJ7pBBnUeqJdv64sPIdL0R1qm2KV+0gW/EZkmnIdVEeD+g9ZQGx0S+akVZAUws3YRsBflmZiB5zZJQ==";
        
        PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(miyao.getBytes());
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        RSAPrivateKey privateKey2 = (RSAPrivateKey) keyFactory.generatePrivate(pkcs8EncodedKeySpec);
        String miwen = "QTEm9Aov02MB7eeRKnRtKDM2E/VBSOuPbFDTD2FQbb46DE4PALWIG6zH4OFi4Dued47aZrE5+PdAlEL+SNnSPgnTFiHZdfttW4N0TNVQ9YwSPX4EieYda7G6wcmtvEi6GZIR9A4H6DDhPaiK1Zo919VGsGOKYBOm5fve2Dg/UiUnWrox+cG0Qqu54LgAaw1elLh8FtZyTLlhjXRZC0Flbp4trOgEZGWQZfkMsqmwFUlHV2BhCnq0R5d1w3eOr3xnJHkXFc/HVFX2RLotQcUZ9WMTZzSUTpqlDh+yR1UHHTtHrUQLit6/IXxjxV58lRM3/8zLY8BelToXpx2mebJqNg==";
        String plainText = Test.decryptByPrivateKey(miwen, privateKey2);  
        System.err.println(plainText);
        
        
        
        
	}
	
}
