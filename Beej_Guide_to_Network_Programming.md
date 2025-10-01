# Beej's Guide to Network Programming

## Two Types of Internet Sockets
Steam Sockets
- reliable two way connected communication stream. Messge arrives in order & Error-free
- used for telnet, ssh applications and with HTTP to get pages
- use Transmittion control Protocol (TCP) [RFC 793-10](https://datatracker.ietf.org/doc/html/rfc793)

Datagram Sockets
- connectionless, you dont have to maintain an open connection
- if you send a datagram it may arrive out of order, but if it arrives it does so error free
- used for video, audio streaming, multiplayer games, tftp (trivial file transfer protocol), and dhcpcd
- use User Datagram Protocol (UDP) [RFC 768-12](https://datatracker.ietf.org/doc/html/rfc768)

## Low level Nonsense and Network Theory
Layered Network Model (OSI)
- a Network Model developed by ISO to standardize telecommunication into distrinct layers

Encapsulation
- act of addign headers and trailers to data as it moves through the layers of OSI model

OSI Layers
- network
- presentation
- session
- transport
- network
- data link
- physical

OSI Model that matter
- application Layer (telnet, ftp, etc.)
- host-to-Host Transport Layer (TCP, UDP)
- internet Layer (IP and routing)
- network Access Layer (Ethernet, wi-fi, or whatever)

## IP Addresses, structs, and Data Munging
The Internet Protocol Version 4 (IPv4)
- has addresses made up of four bytes (octets)
- written in dots and numbers form (192.0.2.111), 32 bits

The Internet Protocol Version 6 (IPv6)
- developed because IPv4 was running out of addresses, 128 bits
- written in hexadecimal representation with every two-bytes seperated by a semi-colon 2001:0db8:c9d2:aee5:73e3:934a:a5ae:9551

IPv6 address shortening rules
- can only compress the longest group of zeros (once)
- can leave off leading zeros
- 2001:0db8:c9d2:0012:0000:0000:0000:0051 -> 2001:db8:c9d2:12::51
- 2001:0db8:ab00:0000:0000:0000:0000:0000 -> 2001:db8:ab00::

Loopback address
- targets the machine you are running now
- IPv4 is 127.0.0.1
- IPv6 is ::1

IPv4, IPv6 compatibility
- to represent an IPv4 address as an IPv6 address use the following notation: `::ffff:[ipv4]`

Subnets
- organizational reasons

  
